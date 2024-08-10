export function replaceOrAppend<T>(
  haystack: T[],
  newValue: T,
  predicate: (a: T, b: T) => boolean
): T[] {
  const res = [...haystack];

  const foundIdx = haystack.findIndex((v) => predicate(v, newValue));
  if (foundIdx === -1) {
    res.push(newValue);
  } else {
    res.splice(foundIdx, 1, newValue);
  }

  return res;
}
