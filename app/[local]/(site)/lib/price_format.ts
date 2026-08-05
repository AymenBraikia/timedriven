const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
});
export function format_price(n: number): string {
    return intl.format(n);
}
