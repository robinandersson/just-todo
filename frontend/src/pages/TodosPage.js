import React, { Component } from 'react';

import { AuthContext } from '../contexts/auth-context';
import TodoItem from '../components/TodoItem';
import { withNotificationCenter } from '../contexts/notification-context';
import ToastError from '../utils/errors/ToastError';
import { deepCopy } from '../utils/array';
import { escapeLineBreaks } from '../utils/string';

class TodosPage extends Component {
  state = {
    todos: [],
    newTodoDescription: '',
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = () => {
    this.context
      .authedRequest(
        ` query {
            todos(userId: "${this.context.userId}") {
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

        this.setState({ todos: resData.data.todos || [] });
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  handleTodoToggle = todoId => {
    this.context
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
        this.fetchTodos();
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  handleDescriptionChange = (todoId, todoDescription) => {
    this.context
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
        const newTodos = deepCopy(this.state.todos);
        newTodos.find(todo => todo.id === id).description = description;

        // TODO: handle possible asynchronicity race conditions - update responses etc. may overlap
        this.setState({ todos: newTodos });

        /* The returned values from the update mutation should be same as todoId and todoDescription (the values sent
        to the mutation). The returned values are what actually got updated however, so the local state needed to be updated to reflect that to avoid multiple sources of truth. */
        if (id !== todoId || todoDescription !== escapeLineBreaks(description))
          throw new ToastError({
            type: 'warning',
            heading: 'Oops!',
            message: 'Something went wrong when updating your todo! :S',
          });
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
          ...err.toast, // overwrite possible previous keys if they're precent in error toast property (from ToastError)
        });
        return err;
      });
  };

  handleNewTodoDescriptionChange = evt => {
    this.setState({ newTodoDescription: evt.target.value });
  };

  handleNewTodo = evt => {
    evt.preventDefault();

    if (this.state.newTodoDescription.trim().length === 0) return;

    this.context
      .authedRequest(
        ` mutation {
            createTodo(description: "${this.state.newTodoDescription}") {
              id
              description
              isCompleted
              createdAt
              completedAt
              userId
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Todo Creation Failed!');

        return res.json();
      })
      .then(resData => {
        // TODO: populating todos should be handled more efficiently. Update local state instead of fetching all again?
        this.fetchTodos();
        this.setState({ newTodoDescription: '' });
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  handleRemoveTodo = todoId => {
    this.context
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
          throw new Error('Todo Removal Failed!');

        return res.json();
      })
      .then(resData => {
        this.fetchTodos();
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  };

  render() {
    const todos = this.state.todos || [];

    return (
      <div className="container border border-gray rounded mx-auto p-8 shadow-lg">
        {todos
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(todo => (
            <TodoItem
              key={todo.id}
              data={todo}
              handleTodoToggle={this.handleTodoToggle}
              handleDescriptionChange={this.handleDescriptionChange}
              handleRemoveTodo={this.handleRemoveTodo}
            />
          ))}

        <form
          className="flex flex justify-center mt-10"
          onSubmit={this.handleNewTodo}
        >
          <input
            type="text"
            placeholder="New Todo"
            value={this.state.newTodoDescription}
            onChange={this.handleNewTodoDescriptionChange}
            className="text-input px-5 py-3 tracking-wide w-2/3 text-lg"
          />
          <button className="btn attached-left text-lg px-5 py-3" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default withNotificationCenter(TodosPage);
