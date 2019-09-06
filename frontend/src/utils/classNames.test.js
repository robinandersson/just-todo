import { concatClassNames } from '../utils/classNames';

it('concatenates classNames', () => {
  expect(concatClassNames('class')).toEqual('class');
  expect(
    concatClassNames('first-class', 'second-class', 'third-class')
  ).toEqual('first-class second-class third-class');
  expect(
    concatClassNames(
      'first-class second-class',
      'third-class',
      'fourth-class fifth-class'
    )
  ).toEqual('first-class second-class third-class fourth-class fifth-class');
});

it('removes trailing white-spaces', () => {
  expect(concatClassNames(' class')).toEqual('class');
  expect(concatClassNames('class ')).toEqual('class');
  expect(concatClassNames(' class ')).toEqual('class');
  expect(concatClassNames('   class')).toEqual('class');
  expect(concatClassNames(' several class names   ')).toEqual(
    'several class names'
  );
  expect(
    concatClassNames(' several class names   ', ' in separate ', 'parameters ')
  ).toEqual('several class names in separate parameters');
});

it('accepts undefined', () => {
  expect(concatClassNames()).toEqual('');
  expect(concatClassNames(undefined, undefined, undefined)).toEqual('');
  expect(concatClassNames('class', undefined, undefined)).toEqual('class');
  expect(
    concatClassNames(undefined, 'first-class', undefined, ' second-class')
  ).toEqual('first-class second-class');
});

it('accepts null values', () => {
  expect(concatClassNames(null)).toEqual('');
  expect(concatClassNames(null, null, null)).toEqual('');
  expect(
    concatClassNames(null, null, null, 'first-class', null, 'second-class')
  ).toEqual('first-class second-class');
});

it('accepts empty strings', () => {
  expect(concatClassNames('')).toEqual('');
  expect(concatClassNames('', '', '')).toEqual('');
  expect(
    concatClassNames('', '', '', 'first-class', '', 'second-class')
  ).toEqual('first-class second-class');
});

it('accepts arrays', () => {
  expect(concatClassNames([])).toEqual('');
  expect(concatClassNames([], 'class')).toEqual('class');
  expect(concatClassNames(['class'])).toEqual('class');
  expect(concatClassNames(['first-class'], ['second-class'])).toEqual(
    'first-class second-class'
  );
  expect(concatClassNames(['', 'first-class', ''], 'second-class')).toEqual(
    'first-class second-class'
  );
  expect(
    concatClassNames(['', ['', ['first-class'], [], '']], ['second-class'])
  ).toEqual('first-class second-class');
});

it('keeps only unique classnames', () => {
  expect(concatClassNames('class', 'class')).toEqual('class');
  expect(concatClassNames('class', 'class', 'another-class')).toEqual(
    'class another-class'
  );
  expect(
    concatClassNames('class', 'another-class', 'class', 'another-class')
  ).toEqual('class another-class');
  expect(concatClassNames('class class class')).toEqual('class');
});

it('accepts crazy combinations of everything', () => {
  expect(
    concatClassNames(
      [],
      ' first-class ',
      [('', [undefined, 'second-class '])],
      [('', [''], ['', 'first-class', ''])],
      ['', 'third-class'],
      'fourth-class',
      ['third-class', ['first-class fifth-class third-class']],
      [null, 'sixth-class ']
    )
  ).toEqual(
    'first-class second-class third-class fourth-class fifth-class sixth-class'
  );

  expect(
    concatClassNames(
      'first-class ',
      ['second-class', null, ['first-class ']],
      [
        '',
        undefined,
        ['third-class fourth-class'],
        ['fifth-class', ['sixth-class'], 'first-class'],
      ],
      []
    )
  ).toEqual(
    'first-class second-class third-class fourth-class fifth-class sixth-class'
  );
});
