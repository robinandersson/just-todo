const concatClassNames = (...classNames) => {
  // split classNames into arrays and concatenate
  const cssProperties = classNames.reduce((acc, elem) => {
    const css = (() => {
      // recursive call to handle (nested) array
      if (Array.isArray(elem)) return concatClassNames(...elem);

      // do not allow objects (except null) or functions, etc.
      if (typeof elem === 'object' && elem !== null) {
        throw new Error(
          `ConcatClassNames function does not accept ${typeof elem} as parameter`
        );
      }
      return elem;
    })();

    // skip falsey values and empty array
    if (!elem || (Array.isArray && elem.length === 0)) return acc;

    // element is valid css: split and append css to accumulated css array
    return acc.concat(css.trim().split(' '));
  }, []);

  // filter out distinct properties and create new css string
  return [...new Set(cssProperties.filter(elem => elem))].join(' ');
};

export { concatClassNames };
