import { getTranslations } from "next-intl/server";

export default async function ImprintPage() {
    const t = await getTranslations("imprint");

    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>{t("heading")}</h1>

            <div className="flex justify-center items-start flex-col gap-2 text-[14px]">
                <p className="font-bold">Aymen Braikia</p>
                <p>Arvell</p>
                <p>Marie-Curie-Straße 14</p>
                <p>60439 Frankfurt am Main</p>
                <p>Germany</p>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("phoneLabel")}</p>
                    +213 559 07 84 48
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("emailLabel")}</p>
                    aymebraikia1@gmail.com
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("vatIdLabel")}</p>
                    DE123456789
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("representativesLabel")}</p>
                    Aymen Braikia
                </div>

                <br />

                <h6>{t("odrHeading")}</h6>

                <p>{t("odrText")}</p>
            </div>
        </div>
    );
}
