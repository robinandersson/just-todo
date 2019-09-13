// Helpers for debouncing functions and React-specific entities (state, functions)
// used for e.g. debouncing change handlers to update internal state instantly but limit number of API-calls

import { useState, useEffect, useRef } from 'react';
import { useConstant } from './functionHooks';

/*
 * Custom hook for debouncing state variables.
 *
 * Waits the specified delay before returning the updated state. Useful for delaying rerenders that depend on the state,
 * and not having to worry about timeout cleanup.
 *
 * Of course, it being a custom hook makes it limited in how it can be used (see react rules of hooks).
 */
const useDebouncedState = (state, delay = 300) => {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(
    () => {
      // Set debouncedState to value (passed in) after the specified delay
      const timeout = setTimeout(() => {
        setDebouncedState(state);
      }, delay);

      // cleanup - clear timeout on rerenders (and unmount)
      return () => clearTimeout(timeout);
    },
    [state, delay] // rerun/reset debouncer when state changes
  );

  return debouncedState; // return only the debounced state
};

/*
 * Custom hook for debouncing a function.
 *
 * Useful for debouncing e.g. functions passed as props without having to care about cleaning up, etc.
 *
 * Of course, it being a custom hook makes it limited in how it can be used (see react rules of hooks).
 */
const useDebouncedFunction = (callback, delay = 300) => {
  const [callbackArgs, setCallbackArgs] = useState([]);

  const initRef = useRef(false);
  const timeoutRef = useRef();

  const constantCallback = useConstant(callback); // make sure callback isn't changed on rerender

  // this will rerun whenever the returned function is invoked
  useEffect(
    () => {
      if (!initRef.current) {
        initRef.current = true;
        return;
      }

      // Set debouncedState to value (passed in) after the specified delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        constantCallback(...callbackArgs);
      }, delay);

      // cleanup - clear timeout on rerenders (and unmount)
      return () => clearTimeout(timeoutRef.current);
    },
    [callbackArgs, constantCallback, delay] // rerun/reset debouncer when state changes
  );

  // when the returned function is invoked, it simply sets the new arguments (causing the useEffect to rerun)
  return (...args) => {
    setCallbackArgs(args);
  };
};

/*
 * Debounces the callback function (simple js function, no React shenanigans).
 *
 * Adds two properties to the wrapped function for dealing with timeout:
 *
 * cancel: a function that simply cancels the timeout
 * timeout: the timeout itself (unnecessary?)
 */
const debounceFunction = (callback, delay = 300) => {
  let timeout;

  const fn = (...args) => {
    const next = () => callback(...args);
    clearTimeout(timeout);
    timeout = setTimeout(next, delay);
  };

  fn.cancel = () => clearTimeout(timeout);
  fn.timeout = timeout;

  return fn;
};

export { useDebouncedState, useDebouncedFunction, debounceFunction };
