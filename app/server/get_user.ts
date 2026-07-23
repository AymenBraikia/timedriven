"use server";

import { User, UserData } from "@/types/user";
import { cookies } from "next/headers";
import { users_collection } from "../db/collections";
import { verifyJwt } from "@/app/(auth)/auth/jwt";

export default async function getUser(): Promise<UserData | undefined> {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;
    if (!token) return;

    const payload = verifyJwt(token);
    if (!payload) return;

    const user = await users_collection.findOne<User>({ email: payload.email });

    if (!user) return;

    const data: UserData = {
        cart: user.cart,
        wish_list: user.wish_list,
        ongoing_orders: user.ongoing_orders,
        fulfilled_orders: user.fulfilled_orders,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        local_pickup: user.local_pickup,
        address: user.address,

        diff_address: user.diff_address,
    };

    return JSON.parse(JSON.stringify(data));
}
