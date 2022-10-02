import {StructureType} from "~/models/StructureType";

export interface StructureFieldInterface {
  type: StructureType;
  title : string,
  value? : any,
  src? : string,
  alt? : string,
}

export class StructureField implements StructureFieldInterface{
  title: string = '';
  type: StructureType = StructureType.String;
}
