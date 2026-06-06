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
	}, []);

	if (!mounted) return null;

	return (
		<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="button2 p-2">
			{theme === "dark" ? <Sun s={40} clr="currentColor"/> : <Moon s={40} clr="currentColor"/>}
		</button>
	);
}
