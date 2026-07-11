interface inputProps {
    placeholder?: string;
    label: string;
    type: "email" | "tel" | "number" | "email" | "password" | "text" | "radio";
    required?: boolean;
    name?: string;
}

export default function Input({ placeholder, label, type, required = false, name }: inputProps) {
    return (
        <div className={`w-full h-fit flex ${type == "radio" ? "items-center" : "flex-col items-start"} justify-center gap-2`}>
            <label className={`min-w-fit ${type == "radio" ? "w-full" : ""}`} htmlFor={label}>
                {label + (required && type != "radio" ? "*" : "")}
            </label>
            <input className="w-full outline-none text-base border-b py-1" placeholder={placeholder} name={name} id={label} type={type} value={type == "radio" ? label : undefined} />
        </div>
    );
}
