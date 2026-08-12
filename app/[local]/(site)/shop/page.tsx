import Watches_list from "@/app/components/watches_list";
import get_watches from "@/app/server/get_watches";
import Banner from "@/app/components/banner";
import { getTranslations } from "next-intl/server";

export default async function ShopPage() {
    const watches = (await get_watches());
    const t = await getTranslations("shop");

    return (
        <section className="w-full flex flex-col items-center justify-start gap-12 py-20 px-4 sm:px-8">
            <div className="w-full max-w-dvw flex flex-col gap-10">
                <Banner>
                    <span className="text-sm uppercase tracking-[0.4em] opacity-80 font-medium">{t("title")}</span>
                </Banner>
                <Watches_list watches={watches} />
            </div>
        </section>
    );
}
