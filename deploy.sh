BASE_API_PATH="https://imcxm.api.stage.imdigital.ca/api"
# BASE_API_PATH="https://imcxm.dev-api.hisenseportal.com/api"
export $(grep -v '^#' .env | xargs -d '\r\n')
echo "BASE_API_PATH=$BASE_API_PATH"

sed -i "s#export const BASE_PATH = \".*\".replace#export const BASE_PATH = \"$BASE_API_PATH\".replace#" ./repositories/base.ts

# remove unnecessary components:
if [ -z ${BRANDS_NAME+x} ]; then
	echo "BRANDS_NAME is unset";
else
	value=`cat ./components/blocks/brands.txt`
	IFS=', ' read -r -a brands <<< "$value"
	IFS=', ' read -r -a selected_brands <<< "$BRANDS_NAME"
	for element in "${selected_brands[@]}"; do
		brands=(${brands[@]/*${element}*/})
	done

	for element in "${brands[@]}"
	do
		rm -rf "./components/blocks/$element"
	done
fi

yarn install
# yarn build
yarn generate
