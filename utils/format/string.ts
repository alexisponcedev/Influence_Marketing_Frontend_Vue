export function capitalizeFirstLetter(string?: string) {
  return "" + string?.charAt(0).toUpperCase() + string?.slice(1);
}

export function camelCaseToTitleCase(string?: string) {
  const result = string?.replace(/([A-Z])/g, " $1");
  return "" + result?.charAt(0).toUpperCase() + result?.slice(1);
}
