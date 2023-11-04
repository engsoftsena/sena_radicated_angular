export function expRplPrefixArray(value: string, prefixes: string[]): string {
  for (const prefix of prefixes) {
    if (value.startsWith(prefix)) {
      return value.replace(prefix, '');
    }
  }
  return value;
}

export function expRplPrefixString(value: string, prefix: string): string {
  if (value.startsWith(prefix)) {
    return value.replace(prefix, '');
  }
  return value;
}
