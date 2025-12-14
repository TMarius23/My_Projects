export function replacer<T>(key: string, value: T) {
  if (value instanceof Map) {
    if (value.size !== 0) {
      return Object.fromEntries(value);
    } else {
      return 0;
    }
  } else {
    return value;
  }
}
