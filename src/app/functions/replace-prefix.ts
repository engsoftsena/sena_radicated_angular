export function fncRplPrefixArray(value: string, prefixes: string[]): string {
  for (const prefix of prefixes) {
    if (value.startsWith(prefix)) {
      return value.replace(prefix, '');
    }
  }
  return value;
}

export function fncRplPrefixString(value: string, prefix: string): string {
  if (value.startsWith(prefix)) {
    return value.replace(prefix, '');
  }
  return value;
}
