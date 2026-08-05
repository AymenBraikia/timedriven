import AtcBtn from "@/app/components/buttons/addToCart";
import { format_price } from "../../lib/price_format";
import get_product from "./get_product";
import Images_list from "./images";
import Link from "next/link";
import InfoTable from "./info_table";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function DynamicPage({ params }: PageProps) {
    const slug = (await params).slug;
    const data = await get_product(slug);

    
    return (
        <div className="h-fit w-dvw py-4 sm:px-16 px-4 flex items-start justify-start mt-10 gap-8 tracking-wider">
            <div className="flex-center flex-col w-2/5">
                <Images_list data={data} />
            </div>
            <div className="w-3/5 flex flex-col justify-start items-start font-secondary capitalize gap-6">
                <h1>{data.brand + " " + data.model}</h1>
                <p>{data.description}</p>
                <h3>Ref. {data.reference}</h3>
                <h3>{format_price(data.price)}</h3>
                <h4>Stock: {data.inStock ? "available" : "not available"}</h4>
                <div className="w-full xl:w-100">
                    <AtcBtn slug={data.slug} />
                </div>
                <div className="flex-center gap-4">
                    <Link href="/store" className="underline title6">
                        Find in store
                    </Link>
                    <Link href="/booking" className="underline title6">
                        Book appointment
                    </Link>
                </div>
                <InfoTable watch={data}/>
                
            </div>
        </div>
    );
}
