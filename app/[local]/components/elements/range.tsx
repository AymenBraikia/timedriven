"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import Input from "./input";
import { useTranslations } from "next-intl";

interface RangeProps {
    label?: string;
    min: number;
    max: number;
    set_value: Dispatch<SetStateAction<[number, number]>>;
}

export default function Range({ min, max, set_value, label }: RangeProps) {
    const t = useTranslations("common.filters");
    const tracker = useRef<HTMLDivElement>(null);

    const bounds: [number, number] = useMemo(() => [min, max], []);

    const [pressed_min, set_pressed_min] = useState<boolean>(false);
    const [pressed_max, set_pressed_max] = useState<boolean>(false);

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            if ((!pressed_min && !pressed_max) || !tracker.current) return;
            const rect = tracker.current.getBoundingClientRect();

            const start = rect.left,
                current = e.clientX;

            if (pressed_min) {
                const distance = current - start;
                const distance_percentage = distance / rect.width;

                const newMin = Math.max(Math.min(max - 1, Math.floor(bounds[1] * distance_percentage)), bounds[0]);
                set_value((prev) => [newMin, prev[1]]);
            }
            if (pressed_max) {
                const distance = current - start;
                const distance_percentage = distance / rect.width;

                const newMax = Math.min(Math.max(min + 1, Math.floor(bounds[1] * distance_percentage)), bounds[1]);
                set_value((prev) => [prev[0], newMax]);
            }
        }

        function handleMouseUp() {
            set_pressed_min(false);
            set_pressed_max(false);
        }

        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [pressed_min, pressed_max]);

    return (
        <div className="w-full flex-start gap-2 flex-wrap px-4 pb-6 overflow-hidden">
            {label ? (
                <p>{label}</p>
            ) : (
                <div className="flex-start w-full">
                    <Input
                        label={t("from")}
                        value={String(min)}
                        min={bounds[0]}
                        max={max}
                        type="number"
                        onChange={(e) =>
                            set_value((prev) => {
                                const newMin = Math.max(bounds[0], Math.min(Number(e.target.value), bounds[1] - 1));
                                return [newMin, prev[1]];
                            })
                        }
                    />
                    <Input
                        label={t("to")}
                        value={String(max)}
                        min={min + 1}
                        max={bounds[1]}
                        type="number"
                        onChange={(e) =>
                            set_value((prev) => {
                                const newMax = Math.max(min + 1, Math.min(Number(e.target.value), bounds[1]));
                                return [prev[0], newMax];
                            })
                        }
                    />
                </div>
            )}

            <div className="w-full gap-4">
                <div className="w-full h-5 relative flex items-center">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-secondary" ref={tracker}>
                        <div className="absolute left-0 top-0 h-full bg-foreground" style={{ width: `${(max * 100) / bounds[1] - ((min - bounds[0]) * 100) / bounds[1]}%`, marginLeft: `${((min - bounds[0]) / bounds[1]) * 100}%` }} />
                    </div>

                    <button
                        type="button"
                        className={`absolute left-0 top-1/2 -translate-y-1/2 aspect-1/2 outline-0 rounded-[10px] flex-center bg-foreground cursor-pointer [transition:width_300ms_ease,left_50ms_ease,top_50ms_ease] ${pressed_min ? "w-2.5" : "w-2"}`}
                        style={{ left: `${((min - bounds[0]) * 100) / bounds[1]}%` }}
                        onMouseDown={() => set_pressed_min(true)}
                    >
                        <span className="w-3/5 h-3/5 rounded-[10px] bg-(--clr-secondary)" />
                        <p className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-1 transition-default ${pressed_min ? "opacity-100" : "opacity-0"}`}>{min}</p>
                    </button>

                    <button
                        type="button"
                        className={`absolute right-0 top-1/2 -translate-y-1/2 aspect-1/2 outline-0 rounded-[10px] flex-center bg-foreground cursor-pointer [transition:width_300ms_ease,left_50ms_ease,top_50ms_ease] ${pressed_max ? "w-2.5" : "w-2"}`}
                        style={{ left: `${(max * 100) / bounds[1]}%` }}
                        onMouseDown={() => set_pressed_max(true)}
                    >
                        <span className="w-3/5 h-3/5 rounded-[10px] bg-(--clr-secondary)" />
                        <p className={`absolute top-full left-1/2 -translate-x-1/2 translate-y-1 transition-default ${pressed_max ? "opacity-100" : "opacity-0"}`}>{max}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
