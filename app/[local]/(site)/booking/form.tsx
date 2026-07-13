"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/app/components/elements/input";
import Submit from "./submit";

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    phone: z.string().min(1, "Phone number is required"),
    reason: z.string().optional(),
    date: z.coerce
        .date({
            error: "Appointment date is required",
        })
        .refine(
            (val) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return val >= today;
            },
            {
                message: "Date cannot be in the past",
            },
        ),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

export default function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput, unknown, FormOutput>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
    });

    const onValid = (data: FormOutput) => Submit(data);

    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const minDateString = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

    return (
        <form onSubmit={handleSubmit(onValid)} className="w-full h-fit p-4 flex-center flex-col gap-6">
            <div className={`w-full h-fit min-h-80 relative flex-center overflow-hidden`}>
                <div className="w-full max-w-200 gap-4 flex-center flex-wrap">
                    <div className="w-[calc(50%-8px)]">
                        <Input required {...register("firstName")} label={"First Name"} type={"text"} />
                        {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName.message}</p>}
                    </div>
                    <div className="w-[calc(50%-8px)]">
                        <Input required {...register("lastName")} label={"Last Name"} type={"text"} />
                        {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName.message}</p>}
                    </div>
                    <div className="w-[calc(50%-8px)]">
                        <Input required {...register("email")} label={"Email"} type={"email"} />
                        {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="w-[calc(50%-8px)]">
                        <Input required {...register("phone")} label={"Phone"} type={"tel"} />
                        {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div className="w-full">
                        <textarea {...register("reason")} className="w-full min-h-10 max-h-40 border-b outline-0 border-secondary p-1" id="messages" placeholder="Reason"></textarea>
                        {errors.lastName && <p className="text-red-400 text-sm">{errors.reason?.message}</p>}
                    </div>

                    <div className="w-full flex flex-col gap-4">
                        <label htmlFor="date" className="text-gray-300">
                            Appointment Date*
                        </label>
                        <input
                            type="date"
                            id="date"
                            min={minDateString}
                            {...register("date")}
                            className="w-full bg-transparent border-b outline-none border-secondary p-1 text-white scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer transition-opacity"
                        />
                        {errors.date && <p className="text-red-400 text-sm">{errors.date?.message as string}</p>}
                    </div>
                </div>
            </div>

            <button type="submit" className="button px-4 py-2">
                Submit
            </button>
        </form>
    );
}
