import { BlockInterface } from "@/interfaces/BlockInterface";

export function SeasonUpgradeProductsCarousel(
    widget: BlockInterface
): BlockInterface {
    const result: any = { ...widget };

    result.structure.selected_products.value.forEach((item: any) => {
        if (item.old_price) item.old_price.hidden = true;
        if (item.new_price) item.new_price.hidden = true;
        if (item.discount_amount) item.discount_amount.hidden = true;
        if (item.features) item.features.hidden = true;
        if (item.retailers) item.retailers.hidden = true;
    });

    return result;
}
