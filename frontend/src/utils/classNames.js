const concatenateClassNames = (...classNames) => {
  return classNames.reduce((className, current) => {
    console.log(className, current);
    return className.concat(current.trim().split(' '));
  }, '');
};

export { concatenateClassNames };
