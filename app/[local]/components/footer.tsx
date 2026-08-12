"use client";
import Link from "next/link";
import Instagram from "./svg/instagram";
import Watch from "./svg/watch";
import Ebay from "./svg/ebay";
import HorizontalLogo from "./svg/logo_horizontal";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");
    return (
        <footer className="w-full py-8 md:px-15 lg:px-20 px-4 flex-center flex-col bg-background font-bold z-30">
            <section className="w-full lg:h-75 lg:flex-row flex-col flex justify-between lg:items-center items-start">
                <div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
                    <HorizontalLogo classnames={"w-64"} />
                    <ul className="flex flex-col justify-start items-start gap-2 tracking-wider">
                        <li>Walther-von-Cronberg-Platz 18</li>
                        <li>60594 Frankfurt am Main</li>
                        <li>Germany</li>
                        <li>+49 152 5544 3810</li>
                        <li>+49 69 7958 0766</li>
                        <li>info@timedriven.de</li>
                    </ul>
                </div>
                <div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
                    <h5 className="lg:title5 title4">{t("shop")}</h5>
                    <ul className="flex flex-col justify-start items-start gap-2">
                        <li>
                            <Link aria-label="watches" href={"/shop"} className="underline">
                                {nav("shop")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="spare parts" href={"/spare"} className="underline">
                                {nav("spare_parts")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="favorites" href={"/favorites"} className="underline">
                                {nav("favorites")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="about us" href={"/info/about"} className="underline">
                                {nav("about")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
                    <h5 className="lg:title5 title4">{t("service")}</h5>
                    <ul className="flex flex-col justify-start items-start gap-2">
                        <li>
                            <Link aria-label="store" href={"/store"} className="underline">
                                {nav("store")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="sell or consign" href={"/sell"} className="underline">
                                {nav("sell_consign")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="polishing and services" href={"/polish"} className="underline">
                                {nav("polishing_services")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="shipping and payments" href={"/info/payments"} className="underline">
                                {nav("shipping_payments")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Frequently Asked Questions" href={"/info/faq"} className="underline">
                                {nav("faq")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Vacancies" href={"/info/vacancies"} className="underline">
                                {nav("vacancies")}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
                    <h5 className="lg:title5 title4">{t("other_platforms")}</h5>
                    <ul className="flex flex-col justify-start items-start gap-2">
                        <li>
                            <Link aria-label="visit chrono 24" href={"https://www.chrono24.de/dealer/timedriven/index.htm"} className="underline flex justify-start items-center gap-4">
                                {<Watch classnames={"w-6"} />}
                                <p>Chrono 24</p>
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="ebay store" href={"https://www.ebay.de/usr/timedriven*de"} className="underline flex justify-start items-center gap-4">
                                {<Ebay classnames={"w-6"} />}
                                <p>Ebay</p>
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="ebay store" href={"https://www.ebay-kleinanzeigen.de/pro/timedriven/"} className="underline flex justify-start items-center gap-4">
                                {<Ebay classnames={"w-6"} />}
                                <p>Ebay Kleinanzeigen</p>
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="instagram page" href={"https://www.instagram.com/timedriven.de/"} className="underline flex justify-start items-center gap-4">
                                {<Instagram classnames={"w-6"} />}
                                <p>Instagram</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
                    <h5 className="lg:title5 title4">{t("legal")}</h5>
                    <ul className="flex flex-col justify-start items-start gap-2">
                        <li>
                            <Link aria-label="imprint" href={"/info/imprint"} className="underline">
                                {t("imprint")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="privacy policiy" href={"/info/policy"} className="underline">
                                {t("privacy")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="terms of use" href={"/info/terms"} className="underline">
                                {t("terms")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="withdrawal" href={"/info/withdraw"} className="underline">
                                {t("withdrawal")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="disclaimer" href={"/info/disclaimer"} className="underline">
                                {t("disclaimer")}
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="cookies policy" href={"/info/cookies"} className="underline">
                                {t("cookies")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="w-full lg:gap-0 gap-4 flex-col lg:flex-row flex justify-between items-center font-normal text-xs lg:tracking-normal tracking-wider">
                <p className="">Timedriven is an independent dealer and is not affiliated with any other brand, nor is it an authorized reseller.</p>
                <p className="">©2026 Timedriven. All Rights Reserved.</p>
                <div className="flex-center flex-wrap gap-4 lg:gap-3">
                    <Link aria-label="imprint" href={"/info/imprint"} className="underline">
                        Imprint
                    </Link>
                    <Link aria-label="privacy policy" href={"/info/policy"} className="underline">
                        Privacy Policy
                    </Link>
                    <Link aria-label="terms of use" href={"/info/terms"} className="underline">
                        Terms
                    </Link>
                    <Link aria-label="withdrawal" href={"/info/withdraw"} className="underline">
                        Withdrawal
                    </Link>
                    <Link aria-label="disclaimer" href={"/info/disclaimer"} className="underline">
                        Disclaimer
                    </Link>
                    <Link aria-label="cookies policy" href={"/info/cookies"} className="underline">
                        Cookie Policy
                    </Link>
                </div>
            </section>
        </footer>
    );
}
