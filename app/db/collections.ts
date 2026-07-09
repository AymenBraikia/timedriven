
import { Watch } from "@/app/types/watch";
import clientPromise from "@/app/db/client";

export const clientDB = await clientPromise;

export const db = clientDB.db("timedriven");

export const watches = db.collection<Watch>("watches");
