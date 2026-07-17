import type { Watch } from "./watch";

export type SpareCategory = "Dial" | "Hands" | "Crown" | "Crystal" | "Bracelet" | "Bezel" | "Movement" | "Battery" | "Caseback" | "Stem" | "Other";

export interface Spare extends Omit<Watch, "type"> {
    partName: string;
    spareCategory: SpareCategory;
    compatibleModels: string[];
    tags?: string[];
    type: "spare";
    reference: string;
}
