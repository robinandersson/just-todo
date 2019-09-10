import React, { Component } from 'react';

import { AuthContext } from '../contexts/auth-context';
import TodoItem from '../components/TodoItem';

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
          throw new Error("Couldn't fetch todos!");
        return res.json();
      })
      .then(resData => {
        this.setState({ todos: resData.data.todos || [] });
      })
      .catch(err => {
        console.log(err);
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
          throw new Error('Todo Toggle Failed!');
        return res.json();
      })
      .then(resData => {
        this.fetchTodos();
      })
      .catch(err => {
        console.log(err);
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
          throw new Error('Updating Todo Description Failed!');
        return res.json();
      })
      .then(resData => {
        this.fetchTodos(); // TODO: obviously, don't refresh all todos whenever a description changes xD
      })
      .catch(err => {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
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

export default TodosPage;
