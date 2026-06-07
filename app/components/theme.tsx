"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sun from "./svg/sun";
import Moon from "./svg/moon";

export function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		const timer = setTimeout(() => setMounted(true), 0);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	if (!mounted) return null;

	return (
		<button aria-label={`switch theme to ${theme == "dark" ? "light" : "dark"}`} type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="button2 p-2">
			{theme === "dark" ? <Sun classnames="w-7 sm:w-10" clr="currentColor" /> : <Moon classnames="w-7 sm:w-10" clr="currentColor" />}
		</button>
	);
}
