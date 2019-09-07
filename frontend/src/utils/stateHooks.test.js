import React, { useRef } from 'react';
import { mount } from 'enzyme';

import { usePrevious, useForceUpdate } from './stateHooks';

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

test('useForceUpdate causes rerender', () => {
  let renderedCount = 0;

  const callback = forceUpdateOnce => {
    const rerenderDoneRef = useRef(false); // only rerender once (don't cause infinite loop)
    const forceUpdate = useForceUpdate();

    renderedCount++;

    if (forceUpdateOnce && !rerenderDoneRef.current) {
      rerenderDoneRef.current = true;
      forceUpdate();
    }
  };

  // test without and then with forceUpdate

  // .. without forceUpdate (without rerender)
  const wrapperWithoutRerender = mount(
    <HookContainer callback={callback} value={false} />
  );
  // increments once on first render, therefore value should be 1
  expect(renderedCount).toBe(1);

  // .. with forceUpdate (with rerender)
  renderedCount = 0;
  const wrapperWithRerender = mount(
    <HookContainer callback={callback} value={true} />
  );

  // increments once on first render, increments again on rerender, therefore value should be 2
  expect(renderedCount).toBe(2);
});
