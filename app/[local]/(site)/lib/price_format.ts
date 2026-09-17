import { eur_value_in_currency, Supported_Countries, Supported_Currencies } from "@/currency";
import { read_cookie } from "./read_cookie";

export function format_price(n: number, country?: Supported_Countries): string {
    if (typeof window !== "undefined") country = read_cookie("Country") as Supported_Countries || "US" ;
    const currency = country_to_currency.get(country||"US")!;
    const rate = eur_value_in_currency.get(currency)!;

    const converted = rate ? Math.round(rate * n) : n;

    const intl = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    });
    return intl.format(converted);
}

const country_to_currency: Map<Supported_Countries, Supported_Currencies> = new Map([
    ["US", "USD"],
    ["CA", "CAD"],
    ["AU", "AUD"],
    ["SG", "SGD"],
    ["HK", "HKD"],
    ["GB", "GBP"],
    ["CN", "CNY"],
    ["JP", "JPY"],
    ["AE", "AED"],
    ["SA", "SAR"],
    ["QA", "QAR"],
    ["KW", "KWD"],
    ["BH", "BHD"],
    ["AD", "EUR"],
    ["AT", "EUR"],
    ["BE", "EUR"],
    ["BG", "EUR"],
    ["CY", "EUR"],
    ["DE", "EUR"],
    ["EE", "EUR"],
    ["ES", "EUR"],
    ["FI", "EUR"],
    ["FR", "EUR"],
    ["GR", "EUR"],
    ["HR", "EUR"],
    ["IE", "EUR"],
    ["IT", "EUR"],
    ["LT", "EUR"],
    ["LU", "EUR"],
    ["LV", "EUR"],
    ["MC", "EUR"],
    ["ME", "EUR"],
    ["MT", "EUR"],
    ["NL", "EUR"],
    ["PT", "EUR"],
    ["SI", "EUR"],
    ["SK", "EUR"],
    ["SM", "EUR"],
    ["VA", "EUR"],
    ["XK", "EUR"],
]);
