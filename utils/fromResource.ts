export function fromResource<T>(input: any) {
  const result: any = { ...input };

  return result as T;
}
