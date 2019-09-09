import { useRef } from 'react';

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

// similar to useFunction, but returns a bound function
const useBind = (f, that, ...params) => {
  const fRef = useRef(f.bind(that, ...params));
  return fRef.current;
};

export { useFunction, useBind };
