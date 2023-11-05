import { BlockInterface } from "@/interfaces/BlockInterface";
import { IIndexable } from "@/utils/IIndexable";
import {
    UHDNewsBoxWidget,
    ProductNewsBoxWidget,
    TVAndAudioFindHisenseWidget,
    ImageDescriptionTilesWidget,
    SeasonUpgradeProductsCarousel,
} from "./functions";

function updateWidget(widget: BlockInterface): BlockInterface {
    switch (widget.name) {
        case "TVAndAudioFindHisense":
            return TVAndAudioFindHisenseWidget(widget);
        case "UHDNewsBox":
            return UHDNewsBoxWidget(widget);
        case "ProductNewsBox":
            return ProductNewsBoxWidget(widget);
        case "ImageDescriptionTiles":
            return ImageDescriptionTilesWidget(widget);
        case "SeasonUpgradeProductsCarousel":
            return SeasonUpgradeProductsCarousel(widget);
        default:
            return { ...widget } as BlockInterface;
    }
}

function updateHidden(widget: BlockInterface): BlockInterface {
    Object.keys(widget.structure).forEach((key) => {
        (widget.structure as IIndexable)[key].hidden = !!(
            widget.structure as IIndexable
        )[key].hidden;
    });
    return widget;
}

export function refactorWidgetsHelper(
    input: Array<any>
): Array<BlockInterface> {
    const old_widgets: Array<BlockInterface> = [...input];
    const new_widgets: Array<BlockInterface> = [];

    old_widgets.forEach((widget) => {
        const updatedWidget = updateHidden(updateWidget(widget));
        if (updatedWidget && Object.keys(updatedWidget).length)
            new_widgets.push(updatedWidget);
    });

    return new_widgets;
}
