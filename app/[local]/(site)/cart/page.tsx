import Banner from "@/app/components/banner";
import Items from "./items";

export default async function cartPage() {
    return (
        <div className="flex-center flex-col w-full gap-12 px-20">
            <Banner>
                <h1 className="font-bold font-secondary">Cart</h1>
            </Banner>

            <div className="flex-center gap-4 w-full">
                <div className="w-full min-h-50">
                    <Items />
                </div>
            </div>
        </div>
    );
}
