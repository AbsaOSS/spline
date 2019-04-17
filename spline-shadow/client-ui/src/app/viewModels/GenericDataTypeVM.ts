import { AttributeRef, DataType } from "../generated/models";

export interface GenericDataTypeVM extends DataType {
    _key: string;
    _type: string;
    elementDataTypeKey: string;
    fields: Array<AttributeRef>;
    name: string;
    nullable: boolean;
}
