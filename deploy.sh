# git update-index --chmod=+x ./deploy.sh

# git fetch origin
# git reset --hard origin/$FORGE_SITE_BRANCH
# git pull origin $FORGE_SITE_BRANCH
# ./deploy.sh

# sudo apt install openjdk-16-jre-headless
# sudo apt install openjdk-18-jre-headless

API_PATH="https://[API_PATH]/docs/api-docs.json"
export $(grep -v '^#' .env | xargs -d '\r\n')
echo "API_PATH=$API_PATH"

yarn install
# yarn generate:openapi -- -i $API_PATH
yarn build
yarn generate