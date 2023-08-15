import { BlockInterface } from "@/interfaces/BlockInterface";

export function ImageDescriptionTilesWidget(
    widget: BlockInterface
): BlockInterface {
    const result: any = { ...widget };
    result.structure.list.maxLength = 5;
    return result;
}
