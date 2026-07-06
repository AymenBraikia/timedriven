export const metadata = {
    title: "Favorites",
    description: "Save and revisit your favorite watches with Timedriven.",
};

export default function FavoritesPage() {
    return (
        <RoutePage
            title="Your favorites"
            intro="Keep an eye on the watches that caught your attention and come back whenever you are ready to continue your search."
            bullets={["Create a personal shortlist of the pieces you love most.", "Compare models and details in one place.", "Receive a prompt when a favorite becomes available again."]}
        />
    );
}
