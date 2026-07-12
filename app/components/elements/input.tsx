import { ChangeEventHandler, FocusEventHandler, Ref } from "react";

interface inputProps {
    placeholder?: string;
    label: string;
    type: "email" | "tel" | "number" | "password" | "text" | "radio";
    required?: boolean;
    name?: string;
    ref?: Ref<HTMLInputElement>;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

export default function Input({ placeholder, label, type, required = false, name, ref, value, onChange, onBlur }: inputProps) {
    return (
        <div className={`w-full h-fit flex ${type == "radio" ? "items-center" : "flex-col items-start"} justify-center gap-2`}>
            <label className={`min-w-fit ${type == "radio" ? "w-full" : ""}`} htmlFor={label}>
                {label + (required && type != "radio" ? "*" : "")}
            </label>
            <input ref={ref} className="w-full outline-none text-base border-b py-1" placeholder={placeholder} name={name} id={label} type={type} value={type == "radio" ? value : undefined} onChange={onChange} onBlur={onBlur} />
        </div>
    );
}