"use client";

import { useState } from "react";
import Input from "../components/elements/input";
import CheckBox from "../components/elements/checkbox";

export default function Form() {
    const [step, set_step] = useState<number>(0);
    const [box, set_box] = useState<boolean>(false);
    const [papers, set_papers] = useState<boolean>(false);

    return (
        <div className="flex-center flex-col gap-4">
            <h3 className="font-medium">Consignment / Sell your Watch</h3>
            <p>Timedriven's expert appraisers provide prompt and detailed estimates so you can get the most out of your sale.</p>

            <div className="flex-center gap-4 mt-10">
                <h6>Personal Information</h6>
                <span className={`w-20 h-0.5 bg-foreground transition-default ${step >= 1 ? "opacity-100" : "opacity-20"}`}></span>
                <h6 className={`transition-default ${step >= 1 ? "opacity-100" : "opacity-20"}`}>Sale preference</h6>
                <span className={`w-20 h-0.5 bg-foreground transition-default ${step >= 2 ? "opacity-100" : "opacity-20"}`}></span>
                <h6 className={`transition-default ${step >= 2 ? "opacity-100" : "opacity-20"}`}>Watch Details</h6>
            </div>

            <form action={step == 2 ? submit : (e) => {}} className="w-full h-fit p-4 flex-center flex-col gap-6">
                <div className={`w-full h-fit ${step >= 2 ? "min-h-200" : "min-h-50"} relative flex-center overflow-hidden`}>
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 grid-cols-2 grid transition-default" style={{ transform: `translateX(${step * -100}dvw)` }}>
                        <Input label={"First Name"} name={"firstName"} type={"text"} required={true} />
                        <Input label={"Last Name"} name={"lastName"} type={"text"} required={true} />
                        <Input label={"Email"} name={"email"} type={"email"} required={true} />
                        <Input label={"Phone"} name={"phone"} type={"tel"} required={true} />
                    </div>
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 grid transition-default" style={{ transform: `translateX(${step * -100 + 100}dvw)` }}>
                        <Input label={"Consignment"} name={"intent"} type={"radio"} required={true} />
                        <Input label={"Sell your watch"} name={"intent"} type={"radio"} required={true} />
                    </div>
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 flex-center flex-col transition-default" style={{ transform: `translateX(${step * -100 + 200}dvw)` }}>
                        <Input label={"Brand"} name={"brand"} type={"text"} required={true} />
                        <Input label={"Asking Price"} name={"price"} type={"number"} required={true} />
                        <Input label={"Model"} name={"model"} type={"email"} required={false} />
                        <Input label={"Reference Number"} name={"refNum"} type={"text"} required={false} />
                        <div className="w-full flex flex-wrap gap-4 justify-start items-start">
                            <p className="w-full">Do you have the original box and papers? Please check all that apply.</p>
                            <div className="flex gap-20">
                                <CheckBox label="Box" active={box} action={set_box} name="box" />
                                <CheckBox label="Paper" active={papers} action={set_papers} name="papers" />
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap gap-4 justify-start items-start">
                            <p className="w-full">Condition</p>
                            <div className="flex gap-20 w-full">
                                <Input label={"New"} name={"condition"} type={"radio"} required={true} />
                                <Input label={"Mint"} name={"condition"} type={"radio"} required={true} />
                                <Input label={"Pre-owned"} name={"condition"} type={"radio"} required={true} />
                            </div>
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <p>Attach Images</p>
                            <input type="file" name="images" id="images" multiple accept="image/*" className="button" max={2} />
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <p>Message</p>
                            <textarea className="w-full max-h-40 border border-secondary p-1" name="message" id="messages" placeholder="Anything else you would like to add?"></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex-center gap-4">
                    <button className="button2 px-4 py-2" onClick={() => set_step((p) => Math.max(p - 1, 0))}>
                        Previous
                    </button>
                    {step == 2 ? (
                        <button type="submit" className="button px-4 py-2">
                            Submit
                        </button>
                    ) : (
                        <button className="button px-4 py-2" onClick={() => set_step((p) => Math.min(p + 1, 2))}>
                            Next
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

function submit(e: FormData) {
    console.log(e);
}
