export enum AssetTokens {
    image = (process.env.ASSETS_IMAGES_TOKEN as any) || "d633bd1c8ebfd1",
    video = (process.env.ASSETS_VIDEOS_TOKEN as any) || "",
    file = (process.env.ASSETS_FILES_TOKEN as any) || "d63a55f5044d0b",
}
