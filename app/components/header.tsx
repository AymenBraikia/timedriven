"use client";
import { useEffect, useState } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import Cross from "./svg/cross";
import MenuBurger from "./svg/menu_burger";
import Search from "./svg/search";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";

export default function Header() {
	const [nav_state, set_nav_state] = useState<boolean>(false);
	const [glassy, set_glassy] = useState<boolean>(false);
	const [lang, set_lang] = useState<"EN" | "DE">("EN");
	const [scroll_y, set_scroll_y] = useState<number>(0);

		useEffect(() => {
		window.addEventListener("scroll", () => set_scroll_y(window.scrollY));
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (scroll_y >= window.innerHeight && !glassy) set_glassy(true);
			else if (scroll_y < window.innerHeight && glassy) set_glassy(false);
		}, 0);
	}, [scroll_y, glassy]);



	return (
		<header className={`flex justify-between items-center h-25 w-dvw fixed top-0 left-0 z-50 p-8 ${glassy ? "text-primary" : "text-white"}`}>
			{<div className={`w-full h-full transition ease-in-out absolute inset-0 -z-10 liquid-glass ${glassy ? "opacity-100" : "opacity-0"}`} />}
			<div className={`w-1/3 flex justify-start items-center transition ${nav_state ? "opacity-0" : "opacity-100"}`}>
				<button className="button2 float-anim " onClick={() => set_nav_state(true)}>
					<MenuBurger s={30} clr="currentColor" />
				</button>
			</div>
			<div className="w-1/3 flex-center">
				<Link href={"#"}>
					<Logo s={100} />
				</Link>
			</div>

			<div className="flex justify-end items-center gap-2 w-1/3">
				<label htmlFor="searchWatches">{<Search s={25} clr="currentColor" />}</label>
				<input type="text" className={`${glassy ? "placeholder:text-primary" : "placeholder:text-white"} outline-0`} placeholder="Search watches" id="searchWatches" />
				<button className={`button2 ${glassy ? "" : "hover:text-primary"}`} onClick={() => set_lang(lang == "EN" ? "DE" : "EN")}>
					{lang}
				</button>
				<Link href={"#"} className={`button2 ${glassy ? "" : "hover:text-primary"}`}>
					<Cart s={25} clr="currentColor" />
				</Link>
				<ThemeToggle />
			</div>

			<nav className={`liquid-glass w-[20dvw] transition-default h-dvh fixed top-0 left-0 flex flex-col justify-start items-start gap-16 p-16 ${nav_state ? "translate-x-0" : "-translate-x-full"}`}>
				<div className="flex flex-col gap-4">
					<h5 className="title3">Shop</h5>
					<ul>
						<li className="my-1">
							<Link href={"#"}>Watches</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Spare Parts</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Favorites</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>About Us</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4">
					<h5 className="title3">Services</h5>
					<ul>
						<li className="my-1">
							<Link href={"#"}>Store</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Sell / Consign</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Polishing and Service</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Shipping & Payments</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Frequently Asked Questions (FAQ)</Link>
						</li>
						<li className="my-1">
							<Link href={"#"}>Vacancies</Link>
						</li>
					</ul>
				</div>
				<button className="absolute top-4 right-4 p-0 cursor-pointer" onClick={() => set_nav_state(false)}>
					<Cross s={50} />
				</button>
			</nav>
		</header>
	);
}
