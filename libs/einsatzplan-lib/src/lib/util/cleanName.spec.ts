import { cleanName } from './cleanName';

describe('cleanName', () => {
  it('replaces all / with _', () => {
    expect(cleanName('foo/bar/baz/banana')).toBe('foo_bar_baz_banana');
  });

  it('works for the empty string', () => {
    expect(cleanName('')).toBe('');
  });
});
