const concatClassNames = (...classNames) => {
  // split classNames into arrays and concatenate
  const cssProperties = classNames.reduce((acc, elem) => {
    // skip falsey values and empty array
    if (!elem || (Array.isArray && elem.length === 0)) return acc;

    const css = (() => {
      // recursive call to handle (nested) array
      if (Array.isArray(elem)) return concatClassNames(...elem);
      if (typeof elem === 'string') return elem;

      throw new Error(
        `ConcatClassNames function does not accept ${typeof elem} as parameter`
      );
    })();

    // split and append css to accumulated css array
    return acc.concat(css.trim().split(' '));
  }, []);

  // filter out distinct properties and create new css string
  return [...new Set(cssProperties)].join(' ');
};

export { concatClassNames };
