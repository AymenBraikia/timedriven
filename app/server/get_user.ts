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

    return JSON.parse(
        JSON.stringify({
            cart: user.cart,
            wish_list: user.wish_list,
            name: user.firstName,
            email: user.email,
        }),
    );
}
