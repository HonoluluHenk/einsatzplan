export function cleanName(value: string): string {
  return value.replace(/\//g, '_');
}
