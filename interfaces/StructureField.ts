import { StructureType } from "~/models/StructureType";

export interface StructureFieldInterface {
    id: number;
    type: StructureType;
    title: string;
    value?: any;
    src?: string;
    target?: string;
    alt?: string;
    items?: any;
    itemText?: string;
    itemValue?: string;
    disabled?: boolean;
}

export class StructureField implements StructureFieldInterface {
    id: number = 0;
    title: string = "";
    type: StructureType = StructureType.String;
    items: any = [];
    value: any = null;
    alt: string = "";
    target?: string;
    src: string = "";
    itemText: string = "title";
    itemValue: string = "value";
    disabled?: boolean = false;
    onChanged?: (event: any) => any;
    loading?: Boolean | (() => Boolean);
    hidden?: boolean = false;
    action: string = "";
    icon: string = "";
    min?: number;
    max?: number;
}
