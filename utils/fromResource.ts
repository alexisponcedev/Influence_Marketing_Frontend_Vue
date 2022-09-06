export function fromResource<T>(input: any) {
  const result: any = { ...input };

  result.slide_urls = input.slides;
  result.map_url = input.map;
  result.region_id = input.region.id;

  return result as T;
}
