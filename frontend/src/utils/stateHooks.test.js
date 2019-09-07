import { usePrevious } from './stateHooks';

import React from 'react';
import { mount } from 'enzyme';

/* This is a basic React Component to house hook(s) for unit-testing purposes
 *
 * As per React docs:
 * Hooks cannot be called from anywhere like regular javascript functions. They can only be called from a functional
 * component or from other hooks.
 */
const HookContainer = ({ callback, value }) => {
  callback(value);
  return null;
};

test('usePrevious returns previous value', () => {
  let value;
  const callback = val => {
    value = usePrevious(val);
  };

  const wrapper = mount(
    <HookContainer callback={callback} value={'initial value'} />
  );

  expect(value).toBe(undefined);
  wrapper.setProps({ value: 'second value' });
  expect(value).toBe('initial value');
  wrapper.setProps({ value: 'third value' });
  expect(value).toBe('second value');
});
