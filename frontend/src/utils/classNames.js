const concatClassNames = (...classNames) => {
  // split classNames into arrays and concatenate

  const cssProperties = classNames.reduce((arr, cssString = '') => {
    return arr.concat(cssString.trim().split(' '));
  }, []);

  // filter out distinct properties and create new css string
  return [...new Set(cssProperties)].join(' ');
};

export { concatClassNames };
