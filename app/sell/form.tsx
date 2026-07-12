"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../components/elements/input";
import CheckBox from "../components/elements/checkbox";
import Submit from "./submit";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(1, "Phone number is required"),

    intent: z.enum(["consign", "sell"], {
        error: "Select consignment or sell",
    }),

    brand: z.string().min(1, "Brand is required"),
    price: z.coerce.number({ error: "Enter a valid price" }).positive("Price must be greater than 0"),
    model: z.string().optional(),
    refNum: z.string().optional(),
    box: z.boolean().optional(),
    papers: z.boolean().optional(),
    condition: z.enum(["new", "mint", "pre-owned"], {
        error: "Select a condition",
    }),
    images: z.any().refine((files: FileList | undefined) => !files || files.length <= 2, "Max 2 images allowed"),
    message: z.string().optional(),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const stepFields: Record<number, (keyof FormInput)[]> = {
    0: ["firstName", "lastName", "email", "phone"],
    1: ["intent"],
    2: ["brand", "price", "model", "refNum", "condition", "images", "message"],
};

export default function Form() {
    const [step, set_step] = useState<number>(0);

    const {
        register,
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormInput, unknown, FormOutput>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
    });

    const nextStep = async () => {
        const valid = await trigger(stepFields[step]);
        if (valid) set_step((p) => Math.min(p + 1, 2));
    };

    const prevStep = () => set_step((p) => Math.max(p - 1, 0));

    const onValid = (data: FormOutput) => Submit(data);
    return (
        <div className="flex-center flex-col gap-4" id="form">
            <h3 className="font-medium">Consignment / Sell your Watch</h3>
            <p>Timedriven's expert appraisers provide prompt and detailed estimates so you can get the most out of your sale.</p>

            <div className="flex-center gap-4 mt-10">
                <h6>Personal Information</h6>
                <span className={`w-20 h-0.5 bg-foreground transition-default ${step >= 1 ? "opacity-100" : "opacity-20"}`}></span>
                <h6 className={`transition-default ${step >= 1 ? "opacity-100" : "opacity-20"}`}>Sale preference</h6>
                <span className={`w-20 h-0.5 bg-foreground transition-default ${step >= 2 ? "opacity-100" : "opacity-20"}`}></span>
                <h6 className={`transition-default ${step >= 2 ? "opacity-100" : "opacity-20"}`}>Watch Details</h6>
            </div>

            <form onSubmit={handleSubmit(onValid)} className="w-full h-fit p-4 flex-center flex-col gap-6">
                <div className={`w-full h-fit ${step >= 2 ? "min-h-200" : "min-h-50"} relative flex-center overflow-hidden`}>
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 grid-cols-2 grid transition-default" style={{ transform: `translateX(${step * -100}dvw)` }}>
                        <div>
                            <Input {...register("firstName")} label={"First Name"} type={"text"} />
                            {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <Input {...register("lastName")} label={"Last Name"} type={"text"} />
                            {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <Input {...register("email")} label={"Email"} type={"email"} />
                            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input {...register("phone")} label={"Phone"} type={"tel"} />
                            {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                        </div>
                    </div>

                    {/* Step 1: Sale preference */}
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 grid transition-default" style={{ transform: `translateX(${step * -100 + 100}dvw)` }}>
                        <Input {...register("intent")} label={"Consignment"} type={"radio"} value="consign" />
                        <Input {...register("intent")} label={"Sell your watch"} type={"radio"} value="sell" />
                        {errors.intent && <p className="text-red-400 text-sm">{errors.intent.message}</p>}
                    </div>

                    {/* Step 2: Watch Details */}
                    <div className="w-full max-w-200 absolute left-1/2 top-1/2 -translate-1/2 gap-4 flex-center flex-col transition-default" style={{ transform: `translateX(${step * -100 + 200}dvw)` }}>
                        <Input {...register("brand")} label={"Brand"} type={"text"} />
                        {errors.brand && <p className="text-red-400 text-sm">{errors.brand.message}</p>}

                        <Input {...register("price")} label={"Asking Price"} type={"number"} />
                        {errors.price && <p className="text-red-400 text-sm">{errors.price.message}</p>}

                        <Input {...register("model")} label={"Model"} type={"text"} />
                        <Input {...register("refNum")} label={"Reference Number"} type={"text"} />

                        <div className="w-full flex flex-wrap gap-4 justify-start items-start">
                            <p className="w-full">Do you have the original box and papers? Please check all that apply.</p>
                            <div className="flex gap-20">
                                <Controller name="box" control={control} render={({ field }) => <CheckBox label="Box" active={!!field.value} action={field.onChange} name="box" />} />
                                <Controller name="papers" control={control} render={({ field }) => <CheckBox label="Paper" active={!!field.value} action={field.onChange} name="papers" />} />
                            </div>
                        </div>

                        <div className="w-full flex flex-wrap gap-4 justify-start items-start">
                            <p className="w-full">Condition</p>
                            <div className="flex gap-20 w-full">
                                <Input {...register("condition")} label={"New"} type={"radio"} value="new" />
                                <Input {...register("condition")} label={"Mint"} type={"radio"} value="mint" />
                                <Input {...register("condition")} label={"Pre-owned"} type={"radio"} value="pre-owned" />
                            </div>
                            {errors.condition && <p className="text-red-400 text-sm">{errors.condition.message}</p>}
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <p>Attach Images</p>
                            <input {...register("images")} type="file" id="images" multiple accept="image/*" className="button" />
                            {errors.images && <p className="text-red-400 text-sm">{errors.images.message as string}</p>}
                        </div>

                        <div className="w-full flex flex-col gap-4">
                            <p>Message</p>
                            <textarea {...register("message")} className="w-full max-h-40 border border-secondary p-1" id="messages" placeholder="Anything else you would like to add?"></textarea>
                        </div>
                    </div>
                </div>

                <div className="flex-center gap-4">
                    <button type="button" className={`button2 px-4 py-2 ${step == 0 ? "opacity-20 cursor-not-allowed!" : "opacity-100"}`} onClick={prevStep}>
                        Previous
                    </button>
                    {step == 2 ? (
                        <button type="submit" className="button px-4 py-2">
                            Submit
                        </button>
                    ) : (
                        <button type="button" className="button px-4 py-2" onClick={nextStep}>
                            Next
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
