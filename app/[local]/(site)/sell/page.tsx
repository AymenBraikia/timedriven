import Link from "next/link";
import Banner from "@/app/components/banner";
import Form from "./form";

export default async function SellPage() {
    return (
        <section className="w-full flex flex-col items-center justify-start gap-12 py-20 px-4 sm:px-20">
            <div className="w-full max-w-dvw flex flex-col gap-10">
                <Banner>
                    <h1 className="tracking-wider font-secondary font-medium">Sell / Consign</h1>
                </Banner>
            </div>

            <div className="w-full">
                <h2>Fill out the form</h2>
                <p className="tracking-widest">Timedriven’s expert appraisers provide prompt and detailed estimates so you can get the most out of your sale.</p>
                <Link href={"#form"} className="underline">
                    Begin
                </Link>
            </div>

            <div className="w-full py-4 flex flex-col gap-8">
                <h3 className="font-medium">How it works</h3>
                <div className="flex justify-start items-start flex-col gap-4">
                    <h4 className="underline">Consign</h4>
                    <p className="text-sm tracking-widest">
                        If you would like us to sell your watch on consignment, we can list it on our website and offer it at a price agreed upon by both parties. When the watch is sold the payment will be sent to you minus the consignment
                        fee.
                    </p>
                    <div className="w-full">
                        <ul className="list-decimal ml-4">
                            <li className="text-xl my-2">
                                Provide Details about your Watch
                                <p className="text-sm tracking-wide mt-2 ml-4">Set the stage for a successful transaction by providing us with every detail about your watch and your asking price.</p>
                            </li>
                            <li className="text-xl my-2">
                                Consignment Contract and Shipping Label
                                <p className="text-sm tracking-wide mt-2 ml-4">
                                    If you would like, we’ll send you a consignment contract and a fully insured shipping label. Alternatively, you can book an appointment in our store in Frankfurt.
                                </p>
                            </li>
                            <li className="text-xl my-2">
                                Inspection
                                <p className="text-sm tracking-wide mt-2 ml-4">Once we receive the watch, we will inspect it thoroughly to verify its authenticity.</p>
                            </li>
                            <li className="text-xl my-2">
                                Listing
                                <p className="text-sm tracking-wide mt-2 ml-4">The watch will be photographed & listed across all of our platforms.</p>
                            </li>
                            <li className="text-xl my-2">
                                Sale and Payment
                                <p className="text-sm tracking-wide mt-2 ml-4">After we have sold your watch and the 14-day return period has ended, we will send you the payment.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-start items-start flex-col gap-4">
                    <h4 className="underline">Sell</h4>
                    <p className="text-sm tracking-widest">Timedriven’s expert appraisers provide prompt and detailed estimates so you can get the most out of your sale. </p>
                    <div className="w-full">
                        <ul className="list-decimal ml-4">
                            <li className="text-xl my-2">
                                Provide Details about your Watch
                                <p className="text-sm tracking-wide mt-2 ml-4">Fill out this form to tell us about your watch and we’ll get back to you within 48 hours with a price quote.</p>
                            </li>
                            <li className="text-xl my-2">
                                Agreement and Shipping Label
                                <p className="text-sm tracking-wide mt-2 ml-4">Once we’ve reached an agreement, you can choose between receiving a shipping label for your watch or coming into our store.</p>
                            </li>
                            <li className="text-xl my-2">
                                Inspection
                                <p className="text-sm tracking-wide mt-2 ml-4">To verify the authenticity of your timepiece, we first thoroughly inspect it upon its arrival.</p>
                            </li>
                            <li className="text-xl my-2">
                                Payment
                                <p className="text-sm tracking-wide mt-2 ml-4">As soon as the inspection is completed, the agreed amount will be paid.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Form />
            </div>
        </section>
    );
}
