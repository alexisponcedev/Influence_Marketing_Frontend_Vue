import { Api } from "@/store";
import getActiveBrand from "@/utils/getActiveBrand";

async function getSettings() {
    if (!Api.Setting.all.length || Api.Setting.lastBrandId != getActiveBrand())
        await Api.Setting.getAll();
}

export default async function getAccessTokens() {
    await getSettings();
    return {
        image:
            Api.Setting.all.find((k: any) => k.key === "dam_images_token")
                ?.value ||
            (process.env.ASSETS_IMAGES_TOKEN as any) ||
            "d633bd1c8ebfd1",
        video:
            Api.Setting.all.find((k: any) => k.key === "dam_videos_token")
                ?.value ||
            (process.env.ASSETS_VIDEOS_TOKEN as any) ||
            "",
        file:
            Api.Setting.all.find((k: any) => k.key === "dam_files_token")
                ?.value ||
            (process.env.ASSETS_FILES_TOKEN as any) ||
            "d63a55f5044d0b",
    };
}
