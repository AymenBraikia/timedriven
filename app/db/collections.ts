import { Watch } from "@/app/types/watch";
import { Spare } from "@/app/types/spare";
import { User } from "@/app/types/user";
import clientPromise from "@/app/db/client";

export const clientDB = await clientPromise;

export const db = clientDB.db("timedriven");

export const watches_collection = db.collection<Watch>("watches");
export const spares_collection = db.collection<Spare>("spares");

export const users_collection = db.collection<User>("users");
