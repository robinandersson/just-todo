import { deepCopy } from './array';

// set up global variables (don't like to use let, but this will have to do)
let emptyObject, simpleObject, averageObject, complexObject;
let emptyArray, simpleArray, averageArray, complexArray;
let simpleMixed, complexMixed;

beforeEach(() => {
  emptyObject = {};
  simpleObject = { a: 'a', b: 'b', c: 'c' };
  complexObject = { nestedA: { a: 'a', b: 'b' }, nestedB: { one: 1, two: 2 } };

  emptyArray = [];
  simpleArray = [1, 2, 3, 4, 5];
  complexArray = [1, [2, 3, 4], 5, [[6], 7], 8, [], ['a', '', ['b']]];

  simpleMixed = [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }];
  complexMixed = {
    arrA: [{ a: 'a', arrB: [{ c: 'c' }, []] }, 1, '', []],
    arrC: [[], '', { arrD: [''] }],
  };
});

it('returns primitive data types', () => {
  expect(deepCopy(1)).toEqual(1);
  expect(deepCopy('a')).toEqual('a');
  expect(deepCopy(true)).toEqual(true);
  expect(deepCopy(undefined)).toBeUndefined();
  expect(deepCopy(null)).toBeNull();
});

it('deep copies empty objects', () => {
  const dcEmptyObject = deepCopy(emptyObject); // deep copied

  expect(dcEmptyObject).not.toBe(emptyObject); // not toBe instead of not toEqual - toEqual does check value-equality
  expect(dcEmptyObject).toEqual(emptyObject); // hence toEqual should work
});

it('deep copies simple objects', () => {
  const dcSimpleObject = deepCopy(simpleObject); // deep copied

  expect(dcSimpleObject).not.toBe(simpleObject);
  expect(dcSimpleObject).toEqual(simpleObject); // nested values should match, hence toEqual
});

it('deep copies complex objects', () => {
  const dcComplexObject = deepCopy(complexObject); // deep copied

  expect(dcComplexObject).not.toBe(complexObject);
  expect(dcComplexObject).toEqual(complexObject); // nested values should match, hence toEqual

  // manually check some nested elements

  // dcComplexObject.nestedA !== complexObject.nestedA
  expect(dcComplexObject.nestedA).not.toBe(complexObject.nestedA);
  expect(dcComplexObject.nestedA).toEqual(complexObject.nestedA);

  // dcComplexObject.nestedA.a === complexObject.nestedA.a
  expect(dcComplexObject.nestedA.a).toEqual(complexObject.nestedA.a);
  expect(dcComplexObject.nestedA.a).toBe(complexObject.nestedA.a);
});

it('deep copies empty arrays', () => {
  const dcEmptyArray = deepCopy(emptyArray); // deep copied

  expect(dcEmptyArray).not.toBe(emptyArray);
  expect(dcEmptyArray).toEqual(emptyArray);
});

it('deep copies simple arrays', () => {
  const dcSimpleArray = deepCopy(simpleArray); // deep copied

  expect(dcSimpleArray).not.toBe(simpleArray);
  expect(dcSimpleArray).toEqual(simpleArray);
});

// complexArray = [1, [2, 3, 4], 5, [[6], 7], 8, [], ['a', '', ['b']]];
it('deep copies complex arrays', () => {
  const dcComplexArray = deepCopy(complexArray); // deep copied

  expect(dcComplexArray).not.toBe(complexArray);
  expect(dcComplexArray).toEqual(complexArray);

  // manually check some nested elements

  expect(dcComplexArray[1]).not.toBe(complexArray[1]);
  expect(dcComplexArray[1]).toEqual(complexArray[1]);

  expect(dcComplexArray[3][0]).toEqual(complexArray[3][0]);

  expect(dcComplexArray[3][0][0]).toEqual(complexArray[3][0][0]);
  expect(dcComplexArray[3][0][0]).toBe(complexArray[3][0][0]);
});

// simpleMixed = [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }];
it('deep copies simple mixed items', () => {
  const dcSimpleMixed = deepCopy(simpleMixed); // deep copied

  expect(dcSimpleMixed).not.toBe(simpleMixed);
  expect(dcSimpleMixed).toEqual(simpleMixed);

  // manually check some nested elements
  expect(dcSimpleMixed[0]).not.toBe(simpleMixed[0]);
  expect(dcSimpleMixed[0]).toEqual(simpleMixed[0]);

  expect(dcSimpleMixed[0].a).toBe(simpleMixed[0].a);
  expect(dcSimpleMixed[0].a).toEqual(simpleMixed[0].a);
});

// complexMixed = { arrA: [{ a: 'a', arrB: [{ c: 'c' }, []] }, 1, '', []], arrC: [[], '', { arrD: ['']}] };
it('deep copies complex mixed items', () => {
  const dcComplexMixed = deepCopy(complexMixed); // deep copied

  expect(dcComplexMixed).not.toBe(complexMixed);
  expect(dcComplexMixed).toEqual(complexMixed);

  // manually check some nested elements

  // arrA: [{ a: 'a'}, ...]
  expect(dcComplexMixed.arrA).not.toBe(complexMixed.arrA);
  expect(dcComplexMixed.arrA).toEqual(complexMixed.arrA);

  // arrA[0]: { a: 'a', arrB: ...}
  expect(dcComplexMixed.arrA[0]).not.toBe(complexMixed.arrA[0]);
  expect(dcComplexMixed.arrA[0]).toEqual(complexMixed.arrA[0]);

  // arrA[0].a: 'a'
  expect(dcComplexMixed.arrA[0].a).toBe(complexMixed.arrA[0].a);
  expect(dcComplexMixed.arrA[0].a).toEqual(complexMixed.arrA[0].a);
});
