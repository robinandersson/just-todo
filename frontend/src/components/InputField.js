import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { concatClassNames } from '../utils/classNames';

const InputField = props => {
  const { name, type = 'text', className, value, onChange, disabled } = props;

  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        className={concatClassNames(className, 'w-full')}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {disabled && (
        <FontAwesomeIcon
          icon={faLock}
          className="absolute right-0 mr-2 h-full"
          color="#cbd5e0"
        />
      )}
    </div>
  );
};

export default InputField;
