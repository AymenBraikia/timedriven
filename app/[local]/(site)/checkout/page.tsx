import Banner from "@/app/components/banner";
import Form from "./form";
import Order_list from "./order_list";
import getUser from "@/app/server/get_user";
import Link from "next/link";

export default async function cartPage() {
    const user = await getUser();
    return (
        <div className="flex-center flex-col w-full gap-12 px-20 py-5">
            <Banner>
                <h1 className="font-bold font-secondary">Checkout</h1>
            </Banner>
            {!user!.cart.length ? (
                <div className="flex-center w-dvw h-100 flex-col gap-4 font-secondary">
                <h1>Your cart is empty</h1>
                <Link className="text-2xl underline" href={"/shop"}>Continue Shopping</Link>
                </div>
            ) : (
                <div className="flex justify-center items-start gap-20 w-full">
                    <div className="w-full flex flex-col justify-start items-start gap-8 p-4">
                        <h2>Billing Details</h2>
                        <Form />
                    </div>

                    <div className="w-[40%] flex flex-col justify-start items-start bg-primary gap-8 p-4">
                        <h2>Your Order</h2>
                        <div className="w-full h-[fit]">
                            <Order_list />
                        </div>
                    </div>
                </div>
            )}{" "}
        </div>
    );
}
