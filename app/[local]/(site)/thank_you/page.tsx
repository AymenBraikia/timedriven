import Banner from "@/app/components/banner";
import getUser from "@/app/server/get_user";
import { getTranslations } from "next-intl/server";
import Order_display from "./order_display";

export default async function thank_you_page() {
    const user = (await getUser())!;
    const t = await getTranslations("orders");

    return (
        <div className="font-secondary p-8 w-full flex-center flex-col gap-12">
            <Banner>
                <div className="w-full font-secondary text-start">
                    <h1>
                        {t("thankYou")} <span className="underline capitalize">{user.first_name}</span> {t("thankYouSuffix")}
                    </h1>
                </div>
            </Banner>

            <div className="flex-center flex-col gap-16 w-full px-4 sm:px-12 font-sans">
                <div className="w-full">
                    <h2>{t("ongoingOrders")}</h2>

                    <div className={`flex-center flex-col w-full mt-12 overflow-x-auto ${user.ongoing_orders.length ? "bg-primary" : ""}`}>
                        <div className={`min-w-250 w-full gap-2 bg-primary pl-2 pr-5 py-6 font-semibold border-b ${user.ongoing_orders.length ? "flex justify-between items-center" : "hidden"}`}>
                            <p className="w-45">{t("orderId")}</p>
                            <p className="w-35">{t("orderDate")}</p>
                            <p className="w-25">{t("orderTotal")}</p>
                            <p className="w-35">{t("paymentMethod")}</p>
                            <p className="w-80">{t("shipping")}</p>
                            <p className="w-25">{t("status")}</p>
                        </div>

                        {user.ongoing_orders.length ? (
                            <div className="min-w-250 overflow-y-auto w-full h-150 flex flex-col justify-start items-start gap-4">
                                {user.ongoing_orders.map((o, i) => (
                                    <Order_display key={o.id} last={user.ongoing_orders.length == i + 1} data={o} />
                                ))}
                            </div>
                        ) : (
                            <h3 className="capitalize">{t("noOngoingOrders")}</h3>
                        )}
                    </div>
                </div>

                <div className="w-full">
                    <h2>{t("deliveredOrders")}</h2>

                    <div className={`flex-center flex-col w-full mt-12 overflow-x-auto ${user.fulfilled_orders.length ? "bg-primary" : ""}`}>
                        <div className={`min-w-250 w-full gap-2 bg-primary pl-2 pr-5 py-6 font-semibold border-b ${user.fulfilled_orders.length ? "flex justify-between items-center" : "hidden"}`}>
                            <p className="w-45">{t("orderId")}</p>
                            <p className="w-35">{t("orderDate")}</p>
                            <p className="w-25">{t("orderTotal")}</p>
                            <p className="w-35">{t("paymentMethod")}</p>
                            <p className="w-80">{t("shipping")}</p>
                            <p className="w-25">{t("status")}</p>
                        </div>

                        {user.fulfilled_orders.length ? (
                            <div className="min-w-250 overflow-y-auto w-full h-150 flex flex-col justify-start items-start gap-4">
                                {user.fulfilled_orders.map((o, i) => (
                                    <Order_display key={o.id} last={user.fulfilled_orders.length == i + 1} data={o} />
                                ))}
                            </div>
                        ) : (
                            <h3 className="capitalize">{t("noDeliveredOrders")}</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
