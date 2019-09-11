// helpers for manipulating strings

const escapeLineBreaks = str => str.replace(/(?:\r\n|\r|\n)/g, '\\n');

export { escapeLineBreaks };
