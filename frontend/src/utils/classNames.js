const concatenateClassNames = (...classNames) => {
  return classNames.reduce((className, current) => {
    return className.concat(current.trim().split(' '));
  }, '');
};

export { concatenateClassNames };
