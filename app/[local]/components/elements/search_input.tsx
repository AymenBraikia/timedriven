"use client";
import React, { useState } from "react";
import Search from "../svg/search";

interface searchProps {
    SearchChildComponent: React.ComponentType<{ item: any }>;
    route: string;
}

export default function Search_input({ route, SearchChildComponent }: searchProps) {
    const [data, set_data] = useState<any[]>([]);
    const [fetching, set_fetching] = useState<boolean>(false);

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
        <div className="flex-center gap-2 relative">
            <label htmlFor="searchWatches">
                <Search classnames="w-7 sm:w-5" clr={"currentColor"} />
            </label>
            <input autoComplete="off" onChange={handle_change} type="text" className={`placeholder:text-primary outline-0`} placeholder="Search watches" id="searchWatches" />
            {data.length ? (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-100 max-w-100 h-fit max-h-100 overflow-y-auto flex flex-col frost font-secondary py-2">
                    {data.map((e, idx) => (
                        <SearchChildComponent key={idx} item={e} />
                    ))}
                </div>
            ) : value ? (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full min-w-100 max-w-100 h-fit max-h-100 overflow-y-auto flex-center frost font-secondary py-2">
                    {fetching ? "Searching..." : "Sorry, but nothing matched your search terms."}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
