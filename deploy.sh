BASE_API_PATH="https://imcxm.dev-api.hisenseportal.com/api"
export $(grep -v '^#' .env | xargs -d '\r\n')
echo "BASE_API_PATH=$BASE_API_PATH"

sed -i "s#export const BASE_PATH = \".*\".replace#export const BASE_PATH = \"$BASE_API_PATH\".replace#" ./repositories/base.ts

yarn install
yarn build
yarn generate
