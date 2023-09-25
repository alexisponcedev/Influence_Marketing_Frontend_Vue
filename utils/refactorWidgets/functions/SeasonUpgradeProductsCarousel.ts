import { BlockInterface } from "@/interfaces/BlockInterface";

export function SeasonUpgradeProductsCarousel(
    widget: BlockInterface
): BlockInterface {
    const result: any = { ...widget };

    result.structure.selected_products.value.forEach((item: any) => {
        item.old_price.hidden = true;
        item.new_price.hidden = true;
        item.discount_amount.hidden = true;
        item.features.hidden = true;
        item.retailers.hidden = true;
    });

    return result;
}
