/* ==========================================================================
 * app/db/collections.ts
 *
 * The problem with the current version:
 *
 *     export const clientDB = await clientPromise;
 *
 * Top-level await at module scope. Every server component that imports this
 * file — directly or transitively — stalls until the Mongo handshake finishes.
 * On a cold Lambda that's TCP + TLS + SCRAM auth before your page code starts.
 *
 * Lazy accessors instead: the connection is only awaited when a query actually
 * runs, so module evaluation, rendering and any cached path stay unblocked.
 * ======================================================================== */

import clientPromise from "@/app/db/client";

import type { Watch } from "@/app/types/watch";
import type { Spare } from "@/app/types/spare";
import type { User } from "@/app/types/user";
import type { Order } from "@/types/order";
import type { Consignment } from "@/types/consignment";
import type { Sell } from "@/types/sell";
import type { Appointment } from "@/types/appointment";

export async function db() {
    const client = await clientPromise;
    return client.db("timedriven");
}

export const watches_collection = async () => (await db()).collection<Watch>("watches");
export const spares_collection = async () => (await db()).collection<Spare>("spares");
export const users_collection = async () => (await db()).collection<User>("users");
export const orders_collection = async () => (await db()).collection<Order>("orders");
export const sell_collection = async () => (await db()).collection<Sell>("sell");
export const consignments_collection = async () => (await db()).collection<Consignment>("consignment");
export const appointments_collection = async () => (await db()).collection<Appointment>("appointment");


export {};
