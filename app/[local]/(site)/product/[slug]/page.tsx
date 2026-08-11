import AtcBtn from "@/app/components/buttons/addToCart";
import { format_price } from "../../lib/price_format";
import get_product from "./get_product";
import Images_list from "./images";
import Link from "next/link";
import InfoTable from "./info_table";
import increase_relevance_score from "@/app/server/increase_relevance_score";
import score_rewards from "../../lib/relevance_score";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}
let increased = false;
export default async function DynamicPage({ params }: PageProps) {
    const slug = (await params).slug;
    const data = await get_product(slug);

    if (!increased) {
        increased = true;
        increase_relevance_score(slug, score_rewards.view_details);
    }

    return (
        <div className="h-fit w-dvw py-4 xl:px-16 px-4 flex items-start justify-start flex-col lg:flex-row mt-10 gap-8 tracking-wider">
            <div className="flex-center w-full lg:w-2/5">
                <Images_list data={data} />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col justify-start items-start font-secondary capitalize gap-6 lg:overflow-y-auto lg:max-h-[85dvh]">
                <h1>{data.brand + " " + data.model}</h1>
                <p className="font-sans">{data.description}</p>
                <h3>Ref. {data.reference}</h3>
                <h3>{format_price(data.price)}</h3>
                <h4>Stock: {data.inStock ? "available" : "not available"}</h4>
                <div className="flex-center gap-2 w-full flex-wrap sm:flex-nowrap lg:flex-wrap xl:flex-nowrap text-xs sm:text-base">
                    <div className="2xl:w-1/2 font-sans xl:w-1/3 lg:w-full sm:w-1/3 w-full">
                        <AtcBtn slug={data.slug} />
                    </div>
                    <div className="flex-center gap-2 font-sans 2xl:w-1/2 xl:w-2/3 lg:w-full sm:w-2/3 w-full flex-wrap sm:flex-nowrap   ">
                        <Link href="/store" className="flex-center button w-full">
                            Find in store
                        </Link>
                        <Link href="/booking" className="flex-center button w-full">
                            Book appointment
                        </Link>
                    </div>
                </div>
                <InfoTable watch={data} />
            </div>
        </div>
    );
}
