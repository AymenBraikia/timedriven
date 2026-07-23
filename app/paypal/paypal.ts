const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export async function getAccessToken() {
    try {
        const auth = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString("base64");

        const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        });

        const data = await res.json();
        return data.access_token;
    } catch (err) {
        throw new Error(`Failed to generate PayPal Access Token: ${err}`);
    }
}
