import { getTranslations } from "next-intl/server";
import { format_price } from "../lib/price_format";
import { Supported_Currencies } from "@/currency";

interface shipping_type {
    country_name: string;
    region: string;
    currency: string;
    shipping_cost: number;
    estimated_delivery: string;
    carrier: string;
    insurance_included: boolean;
    requires_signature: boolean;
    special_notes: string;
}

export default async function BankTransfer({ total, shipping, local_pickup, currency }: { total: number; local_pickup: boolean; shipping: shipping_type; currency: Supported_Currencies }) {
    const t = await getTranslations("checkout");

    return (
        <div className="w-full flex justify-center items-start flex-col gap-4 capitalize">
            <div className="w-full flex justify-between items-center">
                <p>{t("orderNumber")}:</p>
                <p>92212</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p>{t("orderDate")}:</p>
                <p>{new Date().toDateString()}</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p>{t("orderTotal")}:</p>
                <p>{format_price(total + (local_pickup ? 0 : shipping.shipping_cost), currency)}</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p>{t("paymentMethod")}:</p>
                <p>Bank Transfer</p>
            </div>
            <span className="w-full h-px bg-foreground"></span>
            <div className="w-full flex justify-between items-center">
                <p>Bank:</p>
                <p className="font-semibold">Hamburger Sparkasse AG</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p>IBAN:</p>
                <p className="font-semibold">DE12 1234 1234 1234 1234 12</p>
            </div>
            <div className="w-full flex justify-between items-center">
                <p>BIC:</p>
                <p className="font-semibold">ABCDEFGHXXX</p>
            </div>
        </div>
    );
}
