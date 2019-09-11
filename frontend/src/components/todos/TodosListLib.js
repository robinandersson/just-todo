import React, { useState } from 'react';

// functionality for TodoList, extracted to minimize code bloat
// (not put in helpers folder since it's not meant for general use + keep relevant code close)
// (also not using useReducer bc. it's a hassle to use it for async IMO)

import { deepCopy } from '../../utils/array';
import { escapeLineBreaks } from '../../utils/string';
import ToastError from '../../utils/errors/ToastError';
import { useAuthContext } from '../../contexts/auth-context';
import { useNotificationCenterContext } from '../../contexts/notification-context';

import { useFunction } from '../../utils/functionHooks';

const withTodosListLib = WrappedComponent => props => {
  const authContext = useAuthContext();
  const notificationCenter = useNotificationCenterContext();

  const [todos, setTodos] = useState([]);
  const [newTodoDescription, setNewTodoDescription] = useState('');

  // use the custom hook useFunction to avoid rerender on every update
  const fetchTodos = useFunction(() => {
    authContext
      .authedRequest(
        ` query {
          todos(userId: "${authContext.userId}") {
            id
            description
            isCompleted
            createdAt
          }
        }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error("Couldn't fetch todos! :S");
        return res.json();
      })
      .then(resData => {
        if (!resData.data || !resData.data.todos)
          throw new Error("Couldn't fetch todos! :S");
        setTodos(resData.data.todos || []);
      })
      .catch(err => {
        notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  });

  const handleRemoveTodo = todoId => {
    authContext
      .authedRequest(
        ` mutation {
            removeTodo(id: ${todoId}) {
              id
              description
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Removing todo failed! :O');

        return res.json();
      })
      .then(resData => {
        if (resData.errors) throw new Error('Removing todo failed! :O');
        fetchTodos();
      })
      .catch(err => {
        notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  const handleTodoToggle = todoId => {
    authContext
      .authedRequest(
        ` mutation {
            toggleTodo(id: ${todoId}) {
              id
              description
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error("Couldn't toggle todo! :O");
        return res.json();
      })
      .then(resData => {
        fetchTodos();
      })
      .catch(err => {
        notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  const handleDescriptionChange = (todoId, todoDescription) => {
    authContext
      .authedRequest(
        ` mutation {
          modifyTodoDescription(id: "${todoId}", description: "${todoDescription}") {
            id
            description
          }
        }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Updating Todo Failed! :O');
        return res.json();
      })
      .then(resData => {
        if (resData.errors) throw new Error('Updating todo failed! :O');

        const { id, description } = resData.data.modifyTodoDescription; // why extract? see end of this then-block

        // make deep copy of todos, then edit the copy
        const newTodos = deepCopy(todos);
        newTodos.find(todo => todo.id === id).description = description;

        // TODO: handle possible asynchronicity race conditions - update responses etc. may overlap
        setTodos(newTodos);

        /* The returned values from the update mutation should be same as todoId and todoDescription (the values sent
        to the mutation). The returned values are what actually got updated however, so the local state needed to be 
        updated to reflect that to avoid multiple sources of truth. */
        if (id !== todoId || todoDescription !== escapeLineBreaks(description))
          throw new ToastError({
            type: 'warning',
            heading: 'Oops!',
            message: 'Something went wrong when updating your todo! :S',
          });
      })
      .catch(err => {
        notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
          ...err.toast, // overwrite possible previous keys if they're precent in error toast property (from ToastError)
        });
        return err;
      });
  };

  const handleNewTodo = evt => {
    evt.preventDefault();

    // TODO: push error notification here
    if (newTodoDescription.trim().length === 0) return;

    authContext
      .authedRequest(
        ` mutation {
          createTodo(description: "${newTodoDescription}") {
            id
            description
            isCompleted
            createdAt
          }
        }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Todo Creation Failed!');

        return res.json();
      })
      .then(resData => {
        if (resData.errors) throw new Error('Creating new todo failed! :S');

        // make deep copy of todos, then add the new todo
        const newTodos = deepCopy(todos);
        newTodos.push(resData.data.createTodo);

        // TODO: handle possible asynchronicity race conditions - update responses etc. may overlap
        setTodos(newTodos);
        setNewTodoDescription('');
      })
      .catch(err => {
        notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  const handleNewTodoDescriptionChange = evt => {
    setNewTodoDescription(evt.target.value);
  };

  return (
    <WrappedComponent
      todosListLib={{
        todosState: [todos, setTodos],
        newTodoDescriptionState: [newTodoDescription, setNewTodoDescription],
        fetchTodos,
        handleRemoveTodo,
        handleTodoToggle,
        handleDescriptionChange,
        handleNewTodo,
        handleNewTodoDescriptionChange,
      }}
      {...props}
    />
  );
};

export default withTodosListLib;
