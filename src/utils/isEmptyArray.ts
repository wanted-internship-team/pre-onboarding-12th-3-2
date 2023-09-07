export function isEmptyArray<T>(arr: T): boolean {
  return Array.isArray(arr) && arr.length === 0;
}
