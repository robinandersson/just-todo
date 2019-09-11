import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { escapeLineBreaks } from '../../utils/string';

function TodoItem(props) {
  const { id, description, isCompleted } = props.data;
  const { handleTodoToggle, handleDescriptionChange, handleRemoveTodo } = props;

  const handleToggle = evt => {
    handleTodoToggle(id);
  };
  const handleRemove = evt => {
    handleRemoveTodo(id);
  };
  const handleChange = evt => {
    // escape line breaks (otherwise causes unterminated string)
    const escapedDescription = escapeLineBreaks(evt.target.value);

    handleDescriptionChange(id, escapedDescription);
  };

  return (
    <div className="flex relative justify-center sm:mr-8 mt-4 mb-4 group">
      <label className="checkbox-container self-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleToggle}
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
        value={description}
        onChange={handleChange}
        style={{ whiteSpace: 'pre-wrap' }}
      />
      <button
        className="btn mode--danger attached-left invisible group-hover:visible"
        onClick={handleRemove}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
    </div>
  );
}

export default TodoItem;
