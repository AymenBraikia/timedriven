"use server";

interface data_type {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    intent: "consign" | "sell";
    brand: string;
    price: number;
    condition: "new" | "mint" | "pre-owned";
    images: any;
    model?: string | undefined;
    refNum?: string | undefined;
    box?: boolean | undefined;
    papers?: boolean | undefined;
    message?: string | undefined;
}

export default async function Submit(data: data_type) {
    console.log(data)
}
