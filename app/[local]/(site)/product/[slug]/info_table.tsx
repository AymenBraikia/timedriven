"use client";
import { Watch } from "@/types/watch";
import Link from "next/link";
import { useState } from "react";

export default function InfoTable({ watch }: { watch: Watch }) {
    const [tab, set_tab] = useState<0 | 1 | 2 | 3>(0);

    return (
        <div className="w-full flex-col flex">
            <div className="w-full flex-center">
                <button type="button" className={`w-full border-b ${tab == 0 ? "button brightness-100 border-b-foreground" : "button2 brightness-80 border-b-transparent"} transition-default`} onClick={() => set_tab(0)}>
                    Details
                </button>
                <button type="button" className={`w-full border-b ${tab == 1 ? "button brightness-100 border-b-foreground" : "button2 brightness-80 border-b-transparent"} transition-default`} onClick={() => set_tab(1)}>
                    Shipping
                </button>
                <button type="button" className={`w-full border-b ${tab == 2 ? "button brightness-100 border-b-foreground" : "button2 brightness-80 border-b-transparent"} transition-default`} onClick={() => set_tab(2)}>
                    Payments
                </button>
                <button type="button" className={`w-full border-b ${tab == 3 ? "button brightness-100 border-b-foreground" : "button2 brightness-80 border-b-transparent"} transition-default`} onClick={() => set_tab(3)}>
                    Consignment
                </button>
            </div>
            <Displayed_Data watch={watch} tab={tab} />
        </div>
    );
}

function Displayed_Data({ watch, tab }: { watch: Watch; tab: 0 | 1 | 2 | 3 }) {
    switch (tab) {
        case 0:
            const included = `${watch.boxPapers.papers ? "Original papers, " : ""} ${watch.boxPapers.box ? "Box, " : ""} ${watch.boxPapers.firstInvoice ? "first invoice, " : ""} ${watch.boxPapers.serviceInvoice ? "service invoice, " : ""}`.trim();
            return (
                <div className="w-full flex flex-col gap-2 py-4">
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">brand</p>
                        <p>{watch.brand}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">model</p>
                        <p>{watch.model}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">reference</p>
                        <p>{watch.reference}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">year</p>
                        <p>{watch.year}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">case</p>
                        <p>{watch.caseDiameterMm} mm</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">movement</p>
                        <p>{watch.movement}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">bracele</p>
                        <p>{watch.braceletMaterial}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">case material</p>
                        <p>{watch.caseMaterial}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">dial</p>
                        <p>{watch.dialColor}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">condition</p>
                        <p>{watch.condition}</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">Water Resistance</p>
                        <p>{watch.waterResistanceM} m</p>
                    </div>
                    <div className="border-b border-b-secondary flex justify-between md:justify-start items-center py-2">
                        <p className="w-fit md:w-100">Scope of delivery</p>
                        <p>{included.endsWith(",") ? included.slice(0, -1) + "." : included}</p>
                    </div>
                </div>
            );
        case 1:
            return (
                <div className="w-full py-4">
                    Enjoy contactless, risk-free shipping with our long-time partners DHL, UPS, DHL Express and Prosegur. <br /> <br />
                    earn more about shipping costs and times{" "}
                    <Link href="/info/payments" className="underline">
                        here
                    </Link>
                    .
                </div>
            );
        case 2:
            return (
                <div className="w-full py-4 overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b border-secondary p-3 text-sm font-semibold">Payment Method</th>
                                <th className="border-b border-secondary p-3 text-sm font-semibold">Duration</th>
                                <th className="border-b border-secondary p-3 text-sm font-semibold">Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-b border-secondary p-3 text-sm">National Bank Wire</td>
                                <td className="border-b border-secondary p-3 text-sm">1-2 business days</td>
                                <td className="border-b border-secondary p-3 text-sm">0%</td>
                            </tr>
                            <tr>
                                <td className="border-b border-secondary p-3 text-sm">International Bank Wire</td>
                                <td className="border-b border-secondary p-3 text-sm">2-3 business days</td>
                                <td className="border-b border-secondary p-3 text-sm">0%</td>
                            </tr>
                            <tr>
                                <td className="border-b border-secondary p-3 text-sm">PayPal</td>
                                <td className="border-b border-secondary p-3 text-sm">immediate</td>
                                <td className="border-b border-secondary p-3 text-sm">3%</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-sm">Credit/Debit Payment</td>
                                <td className="p-3 text-sm">immediate</td>
                                <td className="p-3 text-sm">1.4%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        case 3:
            return (
                <div className="w-full py-4">
                    Do you wish to trade in one of your watches? Please contact us via the <Link href="/sell">Consignment/ Sell your watch</Link> page with the details about your watch and we will make you an offer.
                </div>
            );

        default:
            return <></>;
    }
}
