const concatClassNames = (...classNames) => {
  // split classNames into arrays and concatenate
  const cssProperties = classNames.reduce((acc, css) => {
    // sanitize falsey values
    if (!css) return acc;

    // split and append css to accumulated css array
    return acc.concat(css.trim().split(' '));
  }, []);

  // filter out distinct properties and create new css string
  return [...new Set(cssProperties)].join(' ');
};

export { concatClassNames };
