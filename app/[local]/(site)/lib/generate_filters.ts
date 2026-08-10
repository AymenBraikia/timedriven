import filters_type from "@/types/filters";
import { Spare } from "@/types/spare";
import { Watch } from "@/types/watch";

export default function generate_filters(items: (Watch | Spare)[]): filters_type {
    const brands: Record<string, boolean> = {},
        movement: Record<string, boolean> = {},
        caseMaterial: Record<string, boolean> = {},
        braceletMaterial: Record<string, boolean> = {},
        dialColor: Record<string, boolean> = {},
        condition = { New: false, "Pre-Owned": false },
        caseDiameterMm = { min: Infinity, max: -Infinity },
        year = { min: Infinity, max: -Infinity },
        waterResistance = { min: Infinity, max: -Infinity },
        includes = { box: false, papers: false, firstInvoice: false, serviceInvoice: false },
        price = { min: Infinity, max: -Infinity },
        availability = { inStock: false };

    for (const item of items) {
        if (!(item.brand in brands)) brands[item.brand] = false;
        if (!(item.movement in movement)) movement[item.movement] = false;
        if (!(item.caseMaterial in caseMaterial)) caseMaterial[item.caseMaterial] = false;
        if (!(item.braceletMaterial in braceletMaterial)) braceletMaterial[item.braceletMaterial] = false;
        if (!(item.dialColor in dialColor)) dialColor[item.dialColor] = false;

        if (item.year < year.min) year.min = item.year;
        else if (item.year > year.max) year.max = item.year;

        if (item.price < price.min) price.min = item.price;
        else if (item.price > price.max) price.max = item.price;

        if (item.caseDiameterMm < caseDiameterMm.min) caseDiameterMm.min = item.caseDiameterMm;
        else if (item.caseDiameterMm > caseDiameterMm.max) caseDiameterMm.max = item.caseDiameterMm;

        if (item.waterResistanceM < waterResistance.min) waterResistance.min = item.waterResistanceM;
        else if (item.waterResistanceM > waterResistance.max) waterResistance.max = item.waterResistanceM;
    }

    return {
        brands,
        movement,
        caseMaterial,
        braceletMaterial,
        dialColor,
        condition,
        caseDiameterMm,
        year,
        waterResistance,
        includes,
        price,
        availability,
    };
}
