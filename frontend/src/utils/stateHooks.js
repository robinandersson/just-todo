import { useState, useRef, useEffect } from 'react';

// hook for accessing previous value of prop or state in a functional component
// sort of a replacement to how class components receives previous state and props in componentDidUpdate
const usePrevious = val => {
  const ref = useRef();

  // update value AFTER current render
  useEffect(() => {
    ref.current = val;
  }, [val]);

  // the return happens before useEffect above, thus returning the old value :)
  return ref.current;
};

// custom hook that mimics forceUpdate() - but can be used with functional components
const useForceUpdate = () => {
  const [value, setValue] = useState(false);
  return () => setValue(!value); // toggle state to force rerender
};

export { usePrevious, useForceUpdate };
