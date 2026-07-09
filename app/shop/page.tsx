import Image from "next/image";
import Watches_list from "../components/watches_list";
import get_watches from "../server/get_watches";

export default async function ShopPage() {
    const watches = await get_watches();

    return (
        <section className="w-full flex flex-col items-center justify-start gap-12 py-20 px-4 sm:px-8">
            <div className="w-full max-w-dvw flex flex-col gap-10">
                <div className="relative w-full h-65 sm:h-80  overflow-hidden">
                    <Image src={"/shopBanner.webp"} fill alt="banner" className="overflow-hidden " />

                    <div className="relative min-h-65 sm:min-h-80">
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 flex h-full flex-col justify-end gap-5 p-8 sm:p-12">
                            <span className="text-sm uppercase tracking-[0.4em] opacity-80 font-medium">Watches</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-secondary tracking-wide">Find your next signature timepiece</h1>
                            <p className="max-w-3xl text-sm sm:text-base leading-7 text-white/75">Our watch experts provide professional assistance for the purchase or sale of new/pre-owned luxury timepieces.</p>
                        </div>
                    </div>
                </div>


                <Watches_list watches={watches} />
            </div>
        </section>
    );
}
