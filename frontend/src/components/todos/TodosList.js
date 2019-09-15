import React, { useEffect } from 'react';

import TodoItem from './TodoItem';
import withTodosListLib from './TodosListLib';

/*
 * This component houses all logic pertaining the presentation the list of todos, this includes all lifecycle logic.
 *
 * The withTodosListLib Hoc is consumed by this component to supply all state and handlers/logic modifying state.
 */
const TodosList = ({ todosListLib }) => {
  const {
    todosState: [todos],
    newTodoDescriptionState: [newTodoDescription],
    fetchTodos,
    handleRemoveTodo,
    handleTodoToggle,
    handleDescriptionChange,
    handleNewTodo,
    handleNewTodoDescriptionChange,
  } = todosListLib;

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="container border border-gray rounded mx-auto p-8 shadow-lg">
      {todos
        .sort((a, b) => a.createdAt - b.createdAt)
        .map(todo => (
          <TodoItem
            key={todo.id}
            data={todo}
            handleTodoToggle={handleTodoToggle}
            handleDescriptionChange={handleDescriptionChange}
            handleRemoveTodo={handleRemoveTodo}
          />
        ))}

      <form className="flex flex justify-center mt-10" onSubmit={handleNewTodo}>
        <input
          type="text"
          placeholder="New Todo"
          value={newTodoDescription}
          onChange={handleNewTodoDescriptionChange}
          className="text-input px-5 py-3 tracking-wide w-2/3 text-lg"
          required
        />
        <button className="btn attached-left text-lg px-5 py-3" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default withTodosListLib(TodosList);
