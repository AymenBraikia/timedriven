"use client";
import { capture_order } from "@/app/paypal/capture_order";
import { create_order } from "@/app/paypal/create_order";
import { Supported_Currencies } from "@/currency";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function PayPal_Btn({ disabled, currency }: { disabled: boolean; currency: Supported_Currencies }) {
    const router = useRouter();
    const { resolvedTheme } = useTheme();

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency,
            }}
        >
            <PayPalButtons
                disabled={disabled}
                fundingSource="paypal"
                forceReRender={[resolvedTheme, currency]}
                style={{
                    layout: "vertical", // 'vertical' or 'horizontal'
                    color: resolvedTheme == "dark" ? "black" : "white", // 'gold', 'blue', 'silver', 'white', 'black'
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
    // console.error(error)
}
