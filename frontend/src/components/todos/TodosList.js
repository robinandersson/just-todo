import React, { useEffect, useState } from 'react';

import TodoItem from './TodoItem';
import { LoadingIcon } from '../icons/DynamicIcons';
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

  const [isInitialFetch, setIsInitialFetch] = useState(true);

  // fetch todos on after first render
  useEffect(() => {
    if (isInitialFetch) fetchTodos().then(() => setIsInitialFetch(false));
  }, [fetchTodos, isInitialFetch]);

  return (
    <div className="container border border-gray rounded mx-auto p-8 shadow-lg">
      {isInitialFetch && (
        <div className="text-center">
          <h2 className="text-gray-500 my-10">Fetching your todos</h2>
          <LoadingIcon size="3x" className="animate-slow mb-10" />
        </div>
      )}

      {/* TODO: Animate reaching inbox zero */}
      {/* skips ternary on first isInitialFetch conditional to avoid nested ternary */}
      {!isInitialFetch && todos.length === 0 ? (
        <div className="text-center text-gray-500 my-20 cursor-default">
          <p>You've reached</p>
          <h2 className="text-4xl">Inbox Zero</h2>
          <h3 className="text-8xl">
            <span role="img" aria-label="Nature Camping emoji">
              🏕
            </span>
          </h3>
          <p>– Peaceful, isn't it –</p>
        </div>
      ) : (
        todos
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(todo => (
            <TodoItem
              key={todo.id}
              data={todo}
              handleTodoToggle={handleTodoToggle}
              handleDescriptionChange={handleDescriptionChange}
              handleRemoveTodo={handleRemoveTodo}
            />
          ))
      )}

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
