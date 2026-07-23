"use client";
import { capture_order } from "@/app/paypal/capture_order";
import { create_order } from "@/app/paypal/create_order";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

export default function PayPal_Btn({ disabled }: { disabled: boolean }) {
    const router = useRouter();
    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: "EUR",
            }}
        >
            <PayPalButtons
                disabled={disabled}
                fundingSource="paypal"
                style={{
                    layout: "vertical", // 'vertical' or 'horizontal'
                    color: "black", // 'gold', 'blue', 'silver', 'white', 'black'
                    shape: "sharp",
                    label: "checkout",
                    height: 45,
                    disableMaxWidth: true,
                }}
                createOrder={create_order}
                onError={handle_error}
                onApprove={async (data: { orderID: string }) => {
                    const result = await capture_order(data);
                    if (result && result.redirect) router.push(result.redirect);
                }}
            />
        </PayPalScriptProvider>
    );
}

function handle_error(error: Record<string, unknown>) {
    // console.clear();
    console.log("and you got an error :/ ", error);
    // console.error(error);
}
