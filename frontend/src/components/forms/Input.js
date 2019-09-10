import React from 'react';

import Icon from '../icons/Icon';
import { concatClassNames } from '../../utils/classNames';

// TODO: redo with container – for setting className (weird if setting className on one of two components)?
/*
 * Component for displaying Component (and accompanying Label)
 */
const Input = ({ name, type = 'text', label, value, onChange, disabled }) => (
  <>
    {label && (
      <label htmlFor={name} className="input-label flex flex-col">
        {label}
      </label>
    )}
    <div className="relative">
      <input
        id={name}
        className={concatClassNames(
          'text-input w-full',
          type === 'password' && 'tracking-widest'
        )}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {disabled && (
        <Icon
          symbol={'lock'}
          className="absolute right-0 mr-2 h-full"
          color="#cbd5e0" // TODO: use globally defined color
        />
      )}
    </div>
  </>
);

export default Input;
