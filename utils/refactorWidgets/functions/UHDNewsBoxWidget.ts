import { BlockInterface } from "@/interfaces/BlockInterface";

export function UHDNewsBoxWidget(widget: BlockInterface): BlockInterface {
    const result: any = { ...widget };

    result.name = "ImageDescriptionTiles";
    result.title = "Image Description Tiles";
    result.image = "ImageDescriptionTiles.png";
    result.category = "ImageTextBox";

    result.structure.divider = {
        title: "Line Divider",
        value: true,
    };

    result.structure.shadow = {
        title: "Image shadow on hover",
        value: true,
    };

    result.structure.list = {
        title: "Items",
        maxLength: 4,
        value: result.structure.list.value?.map(
            (item: any) =>
                <any>{
                    image: item.image,
                    title: item.title,
                    text: item.description,
                }
        ),
    };

    return result;
}
