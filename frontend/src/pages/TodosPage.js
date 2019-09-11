import React, { Component } from 'react';

import TodosList from '../components/todos/TodosList';

/*
 * Page for displaying todos.
 *
 * Keeping this page separate from the actual todos presentation and logic for now to allow for greater flexibility
 * later on when adding more features (e.g. projects, collaboration, etc.). Although it does feel rather silly to have
 * such an empty component xD
 */
class TodosPage extends Component {
  render() {
    return <TodosList />;
  }
}

export default TodosPage;
