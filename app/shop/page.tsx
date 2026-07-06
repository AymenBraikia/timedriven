export const metadata = {
    title: "Shop",
    description: "Explore Timedriven's curated collection of luxury watches.",
};

export default function ShopPage() {
    return (
        <RoutePage
            title="Shop luxury watches"
            intro="Browse our carefully selected collection of pre-owned and new timepieces, from iconic dress watches to modern sport models."
            bullets={["Curated inventory with expert authentication and condition notes.", "Personalized recommendations for collectors and first-time buyers.", "Secure purchasing guidance for every step of the process."]}
        />
    );
}
