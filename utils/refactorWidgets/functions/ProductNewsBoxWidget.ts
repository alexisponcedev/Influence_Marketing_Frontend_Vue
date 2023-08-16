import { BlockInterface } from "@/interfaces/BlockInterface";

export function ProductNewsBoxWidget(widget: BlockInterface): BlockInterface {
    const result: any = { ...widget };

    result.name = "ImageDescriptionTiles";
    result.title = "Image Description Tiles";
    result.image = "ImageDescriptionTiles.png";
    result.category = "ImageTextBox";

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
                    smallImage: item.littleImage,
                    title: item.title,
                    subtitle: item.smallTitle,
                    text: { ...item.note, title: "Description" },
                }
        ),
    };

    return result;
}
