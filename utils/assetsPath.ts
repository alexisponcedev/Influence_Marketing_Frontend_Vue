export default function assetsPath(path?: string) {
  return "" + process.env.BASE_ASSETS_PATH + path;
}
