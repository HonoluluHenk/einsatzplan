import { cleanPathForFirebaseKey } from './firebase-util';

describe('firebase-util', () => {
  describe('cleanPathForFirebaseKey', () => {
    // a firebase path  cannot contain . , $ , # , [ , ] , / , or ASCII control characters 0-31 or 127.
    it.each([
      '.',
      '$',
      '#',
      '[',
      ']',
      '/',
      '\x00',
      '\x01',
      '\x02',
      '\x03',
      '\x04',
      '\x05',
      '\x06',
      '\x07',
      '\x08',
      '\x09',
      '\x10',
      '\x1A',
      '\x1B',
      '\x1C',
      '\x1D',
      '\x1E',
      '\x1F',
      '\x7F',
    ])('replaces %s with _', (input) => {
      expect(cleanPathForFirebaseKey(input)).toEqual('_');
    });
  });
});
