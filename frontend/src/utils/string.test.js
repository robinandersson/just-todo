import { escapeLineBreaks } from './string';

it("doesn't change strings without line breaks", () => {
  const str = 'String without line break';
  const escapedStr = escapeLineBreaks(str);

  expect(escapedStr).toBe(str);
  expect(escapedStr).toBe('String without line break');
});

it('escapes strings with line breaks', () => {
  const str = `String with line break


`;
  const escapedStr = escapeLineBreaks(str);

  expect(escapedStr).not.toBe(str);
  expect(escapedStr).toBe('String with line break\\n\\n\\n');

  const complexStr = `String with line break

  Some more text.

End.`;
  const escapedComplexStr = escapeLineBreaks(complexStr);

  expect(escapedComplexStr).not.toBe(complexStr);
  expect(escapedComplexStr).toBe(
    'String with line break\\n\\n  Some more text.\\n\\nEnd.'
  );
});
