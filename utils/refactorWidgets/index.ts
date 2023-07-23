import { BlockInterface } from "@/interfaces/BlockInterface";

import { updateNotFoundWidget } from "./functions";

function updateWidget(widget: BlockInterface): BlockInterface {
    switch (widget.name) {
        case "NotFound":
            return updateNotFoundWidget(widget);
        default:
            return { ...widget } as BlockInterface;
    }
}

export function refactorWidgetsHelper(input: Array<any>): Array<BlockInterface> {
    const old_widgets: Array<BlockInterface> = [...input];
    const new_widgets: Array<BlockInterface> = [];

    old_widgets.forEach((widget) => {
        const updatedWidget = updateWidget(widget);
        if (updatedWidget && Object.keys(updatedWidget).length)
            new_widgets.push(updatedWidget);
    });

    return new_widgets;
}
