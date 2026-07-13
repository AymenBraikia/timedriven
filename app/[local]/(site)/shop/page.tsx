import Watches_list from "@/app/components/watches_list";
import get_watches from "@/app/server/get_watches";
import Banner from "@/app/components/banner";

export default async function ShopPage() {
    const watches = await get_watches();

    return (
        <section className="w-full flex flex-col items-center justify-start gap-12 py-20 px-4 sm:px-8">
            <div className="w-full max-w-dvw flex flex-col gap-10">
                <Banner>
                    <span className="text-sm uppercase tracking-[0.4em] opacity-80 font-medium">Watches</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-secondary tracking-wide">Find your next signature timepiece</h1>
                    <p className="max-w-3xl text-sm sm:text-base leading-7 text-white/75">Our watch experts provide professional assistance for the purchase or sale of new/pre-owned luxury timepieces.</p>
                </Banner>
                <Watches_list watches={watches} filters_list={{ material: true, brand: true, condition: true, color: true, movement: true, price: true, size: true }} />
            </div>
        </section>
    );
}
