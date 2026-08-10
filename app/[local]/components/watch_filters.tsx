"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Dropdown from "@/app/components/dropdown";
import CheckBox from "@/app/components/elements/checkbox";
import filters_type from "@/types/filters";
import Range from "./elements/range";

interface WatchFiltersProps {
    filters: filters_type;
    set_Filters: (filters: filters_type) => void;
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    setApply: Dispatch<SetStateAction<Map<string, number>>>;
}

export default function WatchFilters({ filters, set_Filters, active, setActive, setApply }: WatchFiltersProps) {
    const categories = Object.keys(filters) as (keyof filters_type)[];

    useEffect(() => {
        if (!active) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [active]);

    const [caseDiameter, set_caseDiameter] = useState<[number, number]>([filters.caseDiameterMm.min, filters.caseDiameterMm.max]);
    const [price, set_price] = useState<[number, number]>([filters.price.min, filters.price.max]);
    const [year, set_year] = useState<[number, number]>([filters.year.min, filters.year.max]);
    const [waterResistance, set_waterResistance] = useState<[number, number]>([filters.waterResistance.min, filters.waterResistance.max]);

    function renderRange(category: keyof filters_type) {
        switch (category) {
            case "price":
                return <Range max={price[1]} min={price[0]} set_value={set_price} />;

            case "year":
                return <Range max={year[1]} min={year[0]} set_value={set_year} />;

            case "caseDiameterMm":
                return <Range max={caseDiameter[1]} min={caseDiameter[0]} set_value={set_caseDiameter} />;

            case "waterResistance":
                return <Range max={waterResistance[1]} min={waterResistance[0]} set_value={set_waterResistance} />;

            default:
                return null;
        }
    }
    useEffect(() => {
        set_Filters({
            ...filters,
            ["price"]: {
                min: price[0],
                max: price[1],
            },
            ["year"]: {
                min: year[0],
                max: year[1],
            },
            ["caseDiameterMm"]: {
                min: caseDiameter[0],
                max: caseDiameter[1],
            },
            ["waterResistance"]: {
                min: waterResistance[0],
                max: waterResistance[1],
            },
        });
    }, [price, year, caseDiameter, waterResistance]);

    return (
        <>
            {active && <button type="button" aria-label="Close filters" className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setActive(false)} />}

            <aside
                aria-label="Watch filters"
                className={`frost fixed left-0 z-50 flex sm:w-80 w-full flex-col gap-6 sm:overflow-y-visible overflow-y-auto p-4 transition-default lg:sticky lg:top-4 lg:h-fit lg:translate-x-0 lg:p-0 ${
                    active ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <button type="button" className="button self-end lg:hidden" onClick={() => setActive(false)}>
                    Close
                </button>

                {categories.map((category) => {
                    const options = filters[category];

                    return (
                        <Dropdown key={category} titles={category}>
                            {!["price", "year", "caseDiameterMm", "waterResistance"].includes(category)
                                ? Object.keys(options).map((option) => {
                                      const key = option as keyof typeof options;
                                      if (["price", "year", "caseDiameterMm", "waterResistance"].includes(category)) return <></>;

                                      return (
                                          <div
                                              className="flex w-full cursor-pointer items-center justify-between text-[14px]"
                                              key={option}
                                              onClick={() => {
                                                  setApply((prev) => {
                                                      const next = new Map(prev);

                                                      const currentVal = next.get(category) ?? 0;

                                                      next.set(category, currentVal + (options[key] ? -1 : 1));

                                                      return next;
                                                  });

                                                  set_Filters({
                                                      ...filters,
                                                      [category]: {
                                                          ...options,
                                                          [key]: !options[key],
                                                      },
                                                  });
                                              }}
                                          >
                                              <CheckBox label={option} active={options[key]} />
                                          </div>
                                      );
                                  })
                                : renderRange(category)}
                        </Dropdown>
                    );
                })}
            </aside>
        </>
    );
}
