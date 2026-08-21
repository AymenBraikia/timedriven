import { Watch } from "@/app/types/watch";
import { Spare } from "@/app/types/spare";
import { User } from "@/app/types/user";
import clientPromise from "@/app/db/client";
import { Order } from "@/types/order";
import { Consignment } from "@/types/consignment";
import { Sell } from "@/types/sell";
import { Appointment } from "@/types/appointment";

export const clientDB = await clientPromise;

export const db = clientDB.db("arvell");

export const watches_collection = db.collection<Watch>("watches");
export const spares_collection = db.collection<Spare>("spares");

export const users_collection = db.collection<User>("users");
export const orders_collection = db.collection<Order>("orders");

export const sell_collection = db.collection<Sell>("sell");
export const consignments_collection = db.collection<Consignment>("consignment");
export const appointments_collection = db.collection<Appointment>("appointment");
