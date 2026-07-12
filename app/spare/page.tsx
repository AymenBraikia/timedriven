import Banner from "../components/banner";
import Watches_list from "../components/watches_list";
import get_spare_parts from "./get_spare";

export default async function SparePage() {
    const parts = await get_spare_parts();
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <Banner>
                <h1>Spare Parts</h1>
            </Banner>

            <div className="sm:px-16 p-2">
                <Watches_list watches={parts} />
            </div>
        </div>
    );
}
