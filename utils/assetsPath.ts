export default function assetsPath(path?: string) {
  return ("" + process.env.BASE_ASSETS_PATH + path).replaceAll(
    "https://imcxm.exodusapi.influencedev.com/storage/images/",
    ""
  );
}
