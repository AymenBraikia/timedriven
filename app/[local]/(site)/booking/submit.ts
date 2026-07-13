"use server";

interface data_type {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    reason?: string | undefined;
}

export default async function Submit(data: data_type) {
    console.log(data);
}
