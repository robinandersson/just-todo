const concatClassNames = (...classNames) => {
  // split classNames into arrays and concatenate
  const cssProperties = classNames.reduce((arr, cssString) => {
    return arr.concat(cssString.trim().split(' '));
  }, []);

  return cssProperties.join(' ');
};

export { concatClassNames };
