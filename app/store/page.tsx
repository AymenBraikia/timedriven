export const metadata = {
    title: "Store",
    description: "Visit our boutique and discover the Timedriven experience.",
};

export default function StorePage() {
    return (
        <RoutePage
            title="Visit our store"
            intro="Our boutique in Frankfurt offers a private and welcoming environment for watch enthusiasts and collectors."
            bullets={["Private consultations and personal appointments.", "A carefully curated selection of watches and accessories.", "Expert support for both browsing and buying decisions."]}
        />
    );
}
