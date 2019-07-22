import { Attribute, DataType } from "../../generated/models";

export interface GenericDataTypeVM extends DataType {
    id: string;
    _type: string;
    elementDataTypeId: string;
    fields: Array<Attribute>;
    name: string;
    nullable: boolean;
}
