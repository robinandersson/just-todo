import { useState, useRef, useEffect } from 'react';

const usePrevious = val => {
  const ref = useRef();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
};

// custom hook that mimics forceUpdate() - but can be used with functional components
const useForceUpdate = () => {
  const [value, setValue] = useState(false);
  return () => setValue(!value); // toggle state to force rerender
};

export { usePrevious, useForceUpdate };
