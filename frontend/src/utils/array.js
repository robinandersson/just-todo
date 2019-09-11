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
  if (typeof item === 'object') {
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
 * Removes the first object (in an array) with certain key-value pair and returns the resulting array.
 *
 * Function takes an array, the object key to look for and the corresponding value.
 */
const removeObjectFromArray = (arr, key, value) => {
  const index = arr.findIndex(obj => obj[key] === value);
  return index >= 0 ? [...arr.slice(0, index), ...arr.slice(index + 1)] : arr;
};

export { deepCopy, removeObjectFromArray };
