export function cleanPathForFirebaseKey(path: string): string {
  // a firebase path  cannot contain . , $ , # , [ , ] , / , or ASCII control characters 0-31 or 127.
  return path.replace(/[.,$#\[\]\/\x00-\x1F\x7F]/g, '_');
}
