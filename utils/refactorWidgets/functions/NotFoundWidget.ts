import { BlockInterface } from "@/interfaces/BlockInterface";

export function updateNotFoundWidget(widget: BlockInterface): BlockInterface {
    const result: BlockInterface = { ...widget };

    return result;
}
