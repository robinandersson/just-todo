import React, { useState, useReducer } from 'react';

// functionality for TodoList, extracted to minimize code bloat
// (not put in helpers folder since it's not meant for general use + keep relevant code close)
// (also not using useReducer bc. it's a hassle to use it for async IMO)

import { deepCopy } from '../../utils/array';
import { escapeLineBreaks } from '../../utils/string';
import ToastError from '../../utils/errors/ToastError';
import { useAuthContext } from '../../contexts/auth-context';
import { useNotificationCenterContext } from '../../contexts/notification-context';

import { useConstant } from '../../utils/functionHooks';

const withTodosListLib = WrappedComponent => props => {
  const authContext = useAuthContext();
  const notificationCenter = useNotificationCenterContext();

  const [newTodoDescription, setNewTodoDescription] = useState('');

  const [todos, dispatch] = useReducer((todos, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [...todos, { ...action.todo }];

      case 'REMOVE_TODO':
        return todos.filter(todo => todo.id !== action.todo.id);

      case 'TOGGLE_TODO':
        // calculate 'isCompleted' property (append to action) for MODIFY_TODO-case to handle (to simply for consumers)
        const { isCompleted } = todos.find(todo => todo.id === action.todo.id);
        action.todo.isCompleted = !isCompleted;
      // falls through

      case 'MODIFY_TODO':
        // make deep copy of todos, then replace the changed todo (keep array order - dont push) with updated properties
        const todosCopy = deepCopy(todos);
        const index = todosCopy.findIndex(todo => todo.id === action.todo.id);
        todosCopy[index] = {
          ...todosCopy[index], // copy properties...
          ...action.todo, // ...but replace the updated ones
        };
        return todosCopy;

      case 'REPLACE_TODOS':
        return action.todos;

      default:
        throw new Error('reducer missing supported action.type!');
    }
  }, []);

  // use the custom hook useFunction to avoid rerender on every update
  const fetchTodos = useConstant(() => {
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
        dispatch({ type: 'REPLACE_TODOS', todos: resData.data.todos || [] });
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
        dispatch({ type: 'REMOVE_TODO', todo: { id: todoId } });
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
        // the mutation actually toggles the boolean (doesn't set the boolean) to avoid race conditions
        ` mutation {
            toggleTodo(id: ${todoId}) {
              id
              isCompleted
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error("Couldn't toggle todo! :O");
        return res.json();
      })
      .then(resData => {
        if (resData.errors || !resData.data || !resData.data.toggleTodo)
          throw new Error('Toggling todo failed! :O');
        // avoid race conditions by only toggling local state instead of using state from server
        dispatch({
          type: 'TOGGLE_TODO',
          todo: { id: resData.data.toggleTodo },
        });
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

        dispatch({ type: 'MODIFY_TODO', todo: { id, description } });

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
        dispatch({ type: 'ADD_TODO', todo: resData.data.createTodo });
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
        todosState: [todos],
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
