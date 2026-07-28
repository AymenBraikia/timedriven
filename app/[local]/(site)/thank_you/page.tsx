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

            <div className="flex-center flex-col gap-16 w-full px-4 sm:px-12 font-sans">
                <div className="w-full">
                    <h2>Ongoing Orders</h2>
                    <div className={`flex-center flex-col w-full mt-12 overflow-x-auto ${user.ongoing_orders.length ? "bg-primary" : ""}`}>
                        <div className={`min-w-250 w-full gap-2 bg-primary pl-2 pr-5 py-6 font-semibold border-b ${user.ongoing_orders.length ? "flex justify-between items-center" : "hidden"}`}>
                            <p className="w-45">Order ID</p>
                            <p className="w-35">Order Date</p>
                            <p className="w-25">Order Total</p>
                            <p className="w-35">Payment Method</p>
                            <p className="w-80">Shipping</p>
                            <p className="w-25">Status</p>
                        </div>

                        {user.ongoing_orders.length ? (
                            <div className="min-w-250 overflow-y-auto w-full h-150 flex flex-col justify-start items-start gap-4">
                                {user.ongoing_orders.map((o, i) => (
                                    <Order_display key={o.id} last={user.ongoing_orders.length == i + 1} data={o} />
                                ))}
                            </div>
                        ) : (
                            <h3 className="capitalize">you don't have any ongoing orders</h3>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <h2>Delivered Orders</h2>
                    <div className={`flex-center flex-col w-full mt-12 overflow-x-auto ${user.fulfilled_orders.length ? "bg-primary" : ""}`}>
                        <div className={`min-w-250 w-full gap-2 bg-primary pl-2 pr-5 py-6 font-semibold border-b ${user.fulfilled_orders.length ? "flex justify-between items-center" : "hidden"}`}>
                            <p className="w-45">Order ID</p>
                            <p className="w-35">Order Date</p>
                            <p className="w-25">Order Total</p>
                            <p className="w-35">Payment Method</p>
                            <p className="w-80">Shipping</p>
                            <p className="w-25">Status</p>
                        </div>

                        {user.fulfilled_orders.length ? (
                            <div className="min-w-250 overflow-y-auto w-full h-150 flex flex-col justify-start items-start gap-4">
                                {user.fulfilled_orders.map((o, i) => (
                                    <Order_display key={o.id} last={user.fulfilled_orders.length == i + 1} data={o} />
                                ))}
                            </div>
                        ) : (
                            <h3 className="capitalize">you don't have any fulfilled orders</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
