import { useRef } from 'react';

// TODO: replace all uses of useFunction to useConstant ()
// TODO: rename file to something better (simply useConstant.js?)

/*
 * useFunction is a little helper for using functions in functional components similar to class component's instance
 * functions (defines function once to avoid rerendering children)
 *
 * Used (mostly) for experimentation purposes for optimizing performance
 * (not really neccessary in such a small project as this one though)
 */
const useFunction = f => {
  const fRef = useRef(f);
  return fRef.current;
};

/*
 * Custom hook ensuring the passed 'item' is declared only once (useMemo doesn't guarantee this)
 *
 * Works with functions, objects, primitives; you name it.
 *
 * Shamelessly copied from https://github.com/Andarist/use-constant
 */
const useConstant = item => {
  const ref = useRef();

  if (!ref.current) {
    ref.current = { v: item };
  }

  return ref.current.v;
};

export { useFunction, useConstant };
