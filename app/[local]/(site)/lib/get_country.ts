import { cookies } from "next/headers";
import { Supported_Countries } from "@/currency";

export async function get_country(): Promise<Supported_Countries> {
    const cookieStore = await cookies();
    const value = cookieStore.get("country")?.value;

    return (value as Supported_Countries) ?? "US";
}
