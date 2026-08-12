"use client";
import React, { Activity, useState } from "react";
import Search from "../svg/search";
import Cross from "../svg/cross";

interface searchProps {
    SearchChildComponent: React.ComponentType<{ item: any }>;
    route: string;
    placeholder: string;
}

export default function Search_input({ route, SearchChildComponent, placeholder }: searchProps) {
    const [data, set_data] = useState<any[]>([]);
    const [fetching, set_fetching] = useState<boolean>(false);
    const [active, set_active] = useState<boolean>(false);

    const [value, set_value] = useState<string>("");

    let timeout: NodeJS.Timeout;

    function handle_change(e: React.ChangeEvent<HTMLInputElement>) {
        set_fetching(true);
        const query = e.currentTarget.value;
        set_value(query);

        set_data([]);

        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            set_data(await (await fetch(route + "/?query=" + query)).json());
            set_fetching(false);
        }, 200);
    }

    return (
        <>
            <div className="flex-center gap-2 relative">
                <label htmlFor="searchWatches" className="md:block hidden">
                    <Search classnames="md:w-7" clr={"currentColor"} />
                </label>

                <button type="button" className="button2 md:hidden p-2" onClick={() => set_active(true)}>
                    <Search classnames="sm:w-8 w-6" clr={"currentColor"} />
                </button>

                <input autoComplete="off" onChange={handle_change} type="text" className={`placeholder:text-primary outline-0 md:block hidden`} placeholder={placeholder} id="searchWatches" />
                {data.length ? (
                    <div className="absolute hidden md:flex top-[calc(100%+8px)] left-0 w-full min-w-100 max-w-100 h-fit max-h-100 overflow-y-auto flex-col frost font-secondary py-2">
                        {data.map((e, idx) => (
                            <SearchChildComponent key={idx} item={e} />
                        ))}
                    </div>
                ) : value ? (
                    <div className="absolute hidden md:flex-center top-[calc(100%+8px)] left-0 w-full min-w-100 max-w-100 h-fit max-h-100 overflow-y-auto frost font-secondary py-2">
                        {fetching ? "Searching..." : "Sorry, but nothing matched your search terms."}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Activity mode={active ? "visible" : "hidden"}>
                <div className="fixed left-0 top-0 fade-in w-dvw h-dvh frost z-60 p-6 pb-0 flex flex-col gap-4 md:hidden">
                    <button aria-label="close search" type="button" className="absolute top-4 right-4 p-0 cursor-pointer" onClick={() => set_active(false)}>
                        <Cross classnames={"w-10"} />
                    </button>
                    <input autoComplete="off" onChange={handle_change} type="text" className={`placeholder:text-primary outline-0 md:hidden block w-[calc(100%-40px)] h-fit border-b`} placeholder={placeholder} id="searchWatches" />

                    {data.length ? (
                        <div className="flex md:hidden top-[calc(100%+8px)] w-full h-full flex-col font-secondary py-2 overflow-y-auto">
                            {data.map((e, idx) => (
                                <SearchChildComponent key={idx} item={e} />
                            ))}
                        </div>
                    ) : value ? (
                        <div className="flex md:hidden top-[calc(100%+8px)] left-0 w-full h-fit overflow-y-auto font-secondary py-2">{fetching ? "Searching..." : "Sorry, but nothing matched your search terms."}</div>
                    ) : (
                        <></>
                    )}
                </div>
            </Activity>
        </>
    );
}
