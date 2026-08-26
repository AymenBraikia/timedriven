import { appointments_collection, consignments_collection, orders_collection, sell_collection, spares_collection, users_collection, watches_collection } from "@/app/db/collections";
import { Order } from "@/types/order";
import { Watch } from "@/types/watch";

export interface AdminStats {
    watches: number;
    inStock: number;
    spares: number;
    users: number;
    orders: number;
    pendingOrders: number;
    revenue: number;
    stockValue: number;
    openEnquiries: number;
}

export async function get_admin_stats(): Promise<AdminStats> {
    const [watches, inStock, spares, users, orders, pendingOrders, completed, stock, sells, consignments, appointments] = await Promise.all([
        watches_collection.countDocuments({}),
        watches_collection.countDocuments({ inStock: true }),
        spares_collection.countDocuments({}),
        users_collection.countDocuments({}),
        orders_collection.countDocuments({}),
        orders_collection.countDocuments({ status: "Pending" }),
        orders_collection.find({ status: "Completed" }, { projection: { amount_to_pay: 1 } }).toArray(),
        watches_collection.find({ inStock: true }, { projection: { price: 1 } }).toArray(),
        sell_collection.countDocuments({ handled: { $ne: true } }),
        consignments_collection.countDocuments({ handled: { $ne: true } }),
        appointments_collection.countDocuments({ handled: { $ne: true } }),
    ]);

    return {
        watches,
        inStock,
        spares,
        users,
        orders,
        pendingOrders,
        revenue: completed.reduce((sum, o) => sum + (o.amount_to_pay || 0), 0),
        stockValue: stock.reduce((sum, w) => sum + (w.price || 0), 0),
        openEnquiries: sells + consignments + appointments,
    };
}

export async function get_recent_orders(limit = 6): Promise<Order[]> {
    const data = await orders_collection.find({}).sort({ created_at: -1 }).limit(limit).toArray();
    return JSON.parse(JSON.stringify(data));
}

export async function get_admin_watches(search?: string): Promise<Watch[]> {
    const query = search
        ? {
              $or: [{ brand: { $regex: search, $options: "i" } }, { model: { $regex: search, $options: "i" } }, { reference: { $regex: search, $options: "i" } }],
          }
        : {};

    const data = await watches_collection.find(query).sort({ date_added: -1 }).toArray();
    return JSON.parse(JSON.stringify(data));
}
