// helpers for manipulating arrays

/*
 * Returns a deep copy of the passed 'item'
 *
 * Recursively iterates through arrays and objects.
 */
const deepCopy = item => {
  // array: return new array and recursivley go through each element
  if (Array.isArray(item)) return item.map(deepCopy);

  // object: return new object and recursively go through each key-value pair
  if (typeof item === 'object' && item !== null) {
    const newObj = { ...item };
    Object.keys(newObj).forEach(key => {
      newObj[key] = deepCopy(newObj[key]);
    });
    return newObj;
  }

  // not array/object: basically return all entities without reference
  return item;
};

/*
 * Removes the first object in the array matching with the supplied key-value pair. It preserves array reference.
 *
 * Function takes an array, the key and the corresponding value to match for. The operation is notdone in-place though.
 */
const removeObjectFromArray = (arr, key, value) => {
  const index = arr.findIndex(obj => obj[key] === value);

  if (index >= 0) {
    const tempArray = [...arr.slice(0, index), ...arr.slice(index + 1)];
    arr.length = 0; // first reset array
    arr.push(...tempArray);
  }
};

export { deepCopy, removeObjectFromArray };
