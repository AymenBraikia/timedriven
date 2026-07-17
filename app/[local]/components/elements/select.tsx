"use client";
import { Activity, Dispatch, SetStateAction, useState } from "react";
import Arrow from "../svg/arrow";

interface SelectProps {
    options: string[];
    value: string;
    set_value: Dispatch<SetStateAction<string>>;
    label?: string;
}

export default function Select({ options, value, set_value, label }: SelectProps) {
    const [active, set_active] = useState<boolean>(false);

    return (
        <div className="w-full flex justify-between items-center relative z-10 font-sans">
            <div onClick={() => set_active(!active)} className="font-semibold cursor-pointer flex justify-start items-center gap-2">
                {label && <p className="text-sm font-normal">{label}</p>}
                <p>{value}</p>
                <Arrow />
            </div>

            <Activity mode={active ? "visible" : "hidden"}>
                <div className="w-full absolute bottom-0 left-0 translate-y-full bg-primary min-w-fit max-h-100 overflow-x-hidden overflow-y-auto select-none">
                    {new Array(...new Set(options)).map((o) => (
                        <p
                            key={o}
                            className="whitespace-nowrap text-secondary hover:text-foreground bg-secondary hover:bg-background transition-default cursor-pointer px-2 py-1"
                            onClick={() => {
                                set_value(o);
                                set_active(false);
                            }}
                        >
                            {o}
                        </p>
                    ))}
                </div>
            </Activity>
        </div>
    );
}
