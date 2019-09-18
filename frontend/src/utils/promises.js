import { useRef, useEffect } from 'react';

/*
 * Function wraps the received promise in another Promise and exposes a function to cancel it.
 *
 * Useful for when you need to cancel a promise prematurely, e.g. on unmount to avoid memory leak.
 *
 * Modifed from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
 */
const makePromiseCancelable = promise => {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(value => (isCanceled ? reject({ isCanceled }) : resolve(value)))
      .catch(err => (isCanceled ? reject({ isCanceled }) : reject(err)));
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
};

/*
 * Hook returns a function that receives a promise - that promise is then automatically cancelled on unmount. Also
 * returns a list of all auto cancelable promises that has been pushed.
 *
 * Used to avoid memory leak, which might occurs when promises are resolved/rejected after component has been unmounted.
 */
function useAutoCleanupPromises() {
  const promisesRef = useRef([]);

  // cleanup - cancel all promises on unmount
  useEffect(() => {
    // name function for more verbose error handling
    return function cancel() {
      promisesRef.current.forEach(promise => promise.cancel());
      promisesRef.current = [];
    };
  }, []);

  /*
   * Function stores a cancelable version of the promise, which is used on unmount for graceful canceling purposes.
   *
   * Returns an object containing the original promise, and a wrapped cancellable version of the promise.
   */
  const autoCleanupPromise = promise => {
    const cancelablePromise = makePromiseCancelable(promise);
    promisesRef.current.push(cancelablePromise);
    return [cancelablePromise.promise, cancelablePromise.cancel];
  };

  return { promises: promisesRef.current, autoCleanupPromise };
}

// TODO: divide makePromiseCancelable and useAutoCleanupPromises into seperate files?
export { makePromiseCancelable, useAutoCleanupPromises };
