API_PATH="https://imcxm.exodusapi.influencedev.com/docs/api-docs.json"
export $(grep -v '^#' .env | xargs -d '\r\n')
echo "API_PATH=$API_PATH"

yarn install
yarn generate:openapi -- -i $API_PATH
yarn build
yarn generate