import {StructureType} from "~/models/StructureType";

export interface StructureFieldInterface {
  id : number,
  type: StructureType;
  title : string,
  value? : any,
  src? : string,
  alt? : string,
  items? : any,
}

export class StructureField implements StructureFieldInterface{
  id : number = 0;
  title: string = '';
  type: StructureType = StructureType.String;
  items : any = [];

  alt : string = '';
  src : string = '';
}
