import React, { Component } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { withNotificationCenter } from '../contexts/notification-context';
import TodosList from '../components/todos/TodosList';

class TodosPage extends Component {
  state = {
    todos: [],
    newTodoDescription: '',
  };

  static contextType = AuthContext;

  render() {
    return <TodosList />;
  }
}

export default withNotificationCenter(TodosPage);
