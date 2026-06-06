"use client";
import { useEffect, useState } from "react";
import Logo from "./svg/logo";
import Link from "next/link";
import Cross from "./svg/cross";
import MenuBurger from "./svg/menu_burger";
import Search from "./svg/search";
import Cart from "./svg/cart";
import { ThemeToggle } from "./theme";
import Info from "./svg/info";

export default function Header() {
	const [nav_state, set_nav_state] = useState<boolean>(false);
	const [cart_state, set_cart_state] = useState<boolean>(false);
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
		<header className={`flex justify-between items-center w-dvw fixed top-0 left-0 z-50 p-8 transition-default ${glassy ? "h-30 text-primary" : "h-25 text-white"}`}>
			{<div className={`w-full h-full transition-default ease-in-out absolute inset-0 -z-10 liquid-glass ${glassy ? "opacity-100" : "opacity-0"}`} />}
			<div className={`w-1/3 flex justify-start items-center transition-default ${nav_state ? "opacity-0" : "opacity-100"}`}>
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
				<button onClick={() => set_cart_state(true)} className={`button2 ${glassy ? "" : "hover:text-primary"}`}>
					<Cart s={25} clr="currentColor" />
				</button>
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

			<div className={`liquid-glass w-[30dvw] transition-default h-dvh fixed top-0 right-0 flex flex-col justify-start items-start gap-16 p-16 font-secondary ${cart_state ? "translate-x-0" : "translate-x-full"}`}>
				<div className="flex justify-between items-center w-full h-1/10">
					<h3 className="title3">YOUR COLLECTION</h3>

					<button className="button2 p-1" onClick={() => set_cart_state(false)}>
						<Cross s={50} />
					</button>
				</div>

				<div className="flex-center flex-col gap-4 w-full h-4/5 font-sans text-secondary">
					<Info s={70} />
					<h5 className="title5 flex-center">Your horological collection is empty.</h5>
				</div>

				<div className="flex flex-wrap justify-between items-center gap-4 w-full h-1/10">
					<div className="flex justify-between items-center w-full">
						<h5 className="title5">SUBTOTAL VALUE</h5>
						<h5 className="title5">{format(0)}</h5>
					</div>

					<button className="button w-full flex-center title5">Proceed to secure settlement</button>
				</div>
			</div>
		</header>
	);
}

function format(n: number): string {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "EUR",
	}).format(n);
}
