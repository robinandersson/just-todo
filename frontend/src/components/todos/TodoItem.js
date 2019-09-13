import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { escapeLineBreaks } from '../../utils/string';
import { useDebouncedFunction } from '../../utils/useDebounce';

/*
 * Component representing a todo item.
 *
 * The component uses an internal description state, and debounces the description change-handler-prop to avoid having
 * to wait for each change to be approved before showing the input (made app feel sluggish).
 *
 * TODO: use throttling instead?
 */
const TodoItem = props => {
  const { id, description, isCompleted } = props.data;
  const { handleTodoToggle, handleDescriptionChange, handleRemoveTodo } = props;

  // TODO: break out a Debounceds components to handle the internal stuff
  const [internalDescription, setInternalDescription] = useState(description);
  const [internalIsCompleted, setInternalIsCompleted] = useState(isCompleted);
  const [internalIsRemoved, setInternalIsRemoved] = useState(false);

  useEffect(() => {
    setInternalDescription(description);
  }, [description]);

  // TODO: add status indicator showing that status update is happening

  // debounce text input change so as to not flood backend with change-requests
  const dbdHandleDescriptionChange = useDebouncedFunction(
    handleDescriptionChange
  );

  const extendedHandleDescriptionChange = evt => {
    setInternalDescription(evt.target.value);

    // escape line breaks (otherwise causes unterminated string)
    const escapedDescription = escapeLineBreaks(evt.target.value);
    dbdHandleDescriptionChange(id, escapedDescription);
  };

  // make toggle instant - don't wait for handler to finish setting state (server request etc.)
  const extendedHandleTodoToggle = evt => {
    setInternalIsCompleted(isCompleted => !isCompleted);
    handleTodoToggle(id); // no need to debounce toggle
  };

  // make removal instant - don't wait for handler to finish setting state (server request etc.)
  const extendedHandleRemoveTodo = evt => {
    setInternalIsRemoved(true);
    handleRemoveTodo(id); // no need to debounce removal
  };

  return internalIsRemoved ? null : (
    <div className="flex relative justify-center sm:mr-8 mt-4 mb-4 group">
      <label className="checkbox-container self-center">
        <input
          type="checkbox"
          checked={internalIsCompleted}
          onChange={extendedHandleTodoToggle}
          className="native-checkbox"
        />
        <span className="checkbox"></span>
      </label>
      <textarea
        rows="1"
        className={
          'w-full resize-y text-sm sm:text-base md:text-lg p-5 rounded border border-gray-200 hover:border-gray-400 hover:shadow focus:outline-none focus:border-gray-400 focus:shadow-outline attached-right' +
          (isCompleted ? ' bg-gray-100 text-gray-500 line-through' : '')
        }
        value={internalDescription}
        onChange={extendedHandleDescriptionChange}
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <button
        className="btn mode--danger attached-left invisible group-hover:visible"
        onClick={extendedHandleRemoveTodo}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default TodoItem;
