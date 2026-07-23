import Banner from "@/app/components/banner";
import getUser from "@/app/server/get_user";
import Order_display from "./order_display";

export default async function thank_you_page() {
    const user = (await getUser())!;

    return (
        <div className="font-secondary p-8 w-full flex-center flex-col gap-12">
            <Banner>
                <div className="w-full font-secondary text-start">
                    <h1>
                        Thank you <span className="underline capitalize">{user.first_name}</span> for your order
                    </h1>
                </div>
            </Banner>

            <div className="flex-center flex-col gap-4 w-full px-12">
                <div className="w-full">
                    <h2>Ongoing Orders</h2>
                    <div className={`flex-center flex-col w-full gap-2 mt-12 p-2 ${user.ongoing_orders.length ? "bg-primary" : ""}`}>
                        {user.ongoing_orders.length ? (
                            <>
                                <div className="flex justify-between items-center font-semibold w-full border-b">
                                    <p className="w-full bg-primary">Order ID</p>
                                    <p className="w-full bg-primary">Order Items</p>
                                    <p className="w-full bg-primary">Order Date</p>
                                    <p className="w-full bg-primary">Order Total</p>
                                    <p className="w-full bg-primary">Payment Method</p>
                                    <p className="w-full bg-primary">Shipping</p>
                                </div>
                                {user.ongoing_orders.map((o, i) => (
                                    <Order_display key={o.id} last={user.ongoing_orders.length == i + 1} data={o} />
                                ))}
                            </>
                        ) : (
                            <h3 className="capitalize">you don't have any ongoing orders</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
