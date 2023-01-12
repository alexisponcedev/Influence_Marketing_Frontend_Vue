import {StructureType} from "~/models/StructureType";

export default function blockAddItem(base: any, name: string, item: any) {

    if (!base.hasOwnProperty(name)) base[name] = item;

    base[name].id = item.id;
    // base[name].title = item.title;
    

    if (base[name].type !== item.type) base[name].type = item.type;

    if (item.type === StructureType.Image) {
        base[name].src = base[name].src || item.src;
        base[name].alt = base[name].src || item.alt;
    }

    if (item.type === StructureType.List) {
        base[name].newItem = item.newItem;
        base[name].value.forEach((element: any, index: number) => {
            Object.keys(item.newItem).forEach((key: string) => {
                blockAddItem(base[name].value[index], key, JSON.parse(JSON.stringify(item.newItem[key])))
            })
        })
    }

    if (item.type === StructureType.Object) {
        Object.keys(item.value).forEach((key: string) => {
            blockAddItem(base[name].value, key, item.value[key])
        })
    }

    if (item.type === StructureType.Select) {
        base[name].items = item.items;
    }
}
