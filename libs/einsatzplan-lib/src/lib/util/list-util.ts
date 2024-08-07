type KeyValue<T, Key extends keyof T> = T[Key] & (string | number | symbol);

export function groupingBy<T, Key extends keyof T>(keyMapper: Key | ((t: T) => KeyValue<T, Key>))
  : (acc: Record<KeyValue<T, Key>, T>, item: T) => Record<KeyValue<T, Key>, T> {
  return (acc, item) => {
    const keyValue = calculateKeyValue(item, keyMapper);
    acc[keyValue] = item;
    return acc;
  }
}

function calculateKeyValue<T, Key extends keyof T>(item: T, keyMapper: Key | ((t: T) => KeyValue<T, Key>)): KeyValue<T, Key> {
  if (typeof keyMapper === 'function') {
    return keyMapper(item);
  }

  const keyValue = item[keyMapper];
  if (typeof keyValue !== 'string' && typeof keyValue !== 'number' && typeof keyValue !== 'symbol') {
    throw Error('Key is not a string, number or symbol: ' + keyValue);
  }

  return keyValue;
}
