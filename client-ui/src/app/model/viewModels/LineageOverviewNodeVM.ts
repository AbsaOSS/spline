import { LineageOverviewNode } from "src/app/generated/models";

export interface LineageOverviewNodeVM extends LineageOverviewNode {
    _id: string
    name: string
    _type: string
    writesTo?: string
}
