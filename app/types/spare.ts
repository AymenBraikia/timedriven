import type { Watch } from "./watch";

export type SpareCategory =
    | "Dial"
    | "Hands"
    | "Crown"
    | "Crystal"
    | "Bracelet"
    | "Bezel"
    | "Movement"
    | "Battery"
    | "Caseback"
    | "Stem"
    | "Other";

export interface Spare extends Watch {
    partName: string;
    spareCategory: SpareCategory;
    compatibleModels: string[];
    tags?: string[];
}
