import { getTranslations } from "next-intl/server";

export default async function ImprintPage() {
    const t = await getTranslations("imprint");

    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>{t("heading")}</h1>

            <div className="flex justify-center items-start flex-col gap-2 text-[14px]">
                <p className="font-bold">Frederik Schlüter</p>
                <p>Timedriven</p>
                <p>Walther-von-Cronberg-Platz 18</p>
                <p>60594 Frankfurt am Main</p>
                <p>Germany</p>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("phoneLabel")}</p>
                    +49 (0) 152 5544 3810
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("emailLabel")}</p>
                    info@timedriven.de
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("vatIdLabel")}</p>
                    DE123456789
                </div>

                <div className="flex-center gap-2">
                    <p className="font-bold">{t("representativesLabel")}</p>
                    Frederik Schlüter
                </div>

                <br />

                <h6>{t("odrHeading")}</h6>

                <p>{t("odrText")}</p>
            </div>
        </div>
    );
}
