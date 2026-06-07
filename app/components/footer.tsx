import Link from "next/link";
import Instagram from "./svg/instagram";
import Watch from "./svg/watch";
import Ebay from "./svg/ebay";
import Logo from "./svg/logo";

export default function Footer() {
	return (
		<footer className="w-full py-8 sm:px-20 px-4 flex-center flex-col bg-background font-bold">
			<section className="w-full sm:flex-row flex-col flex justify-between sm:items-center items-start">
				<div className="flex flex-col justify-start items-start gap-4 my-5">
					<Logo classnames={"sm:w-16 w-32"} />
					<ul className="flex flex-col justify-start items-start gap-2 tracking-wider">
						<li>Walther-von-Cronberg-Platz 18</li>
						<li>60594 Frankfurt am Main</li>
						<li>Germany</li>
						<li>+49 152 5544 3810</li>
						<li>+49 69 7958 0766</li>
						<li>info@timedriven.de</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5">
					<h5 className="sm:title5 title4">Shop</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link href={"#"} className="underline">
								Watches
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Spare Parts
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Favorites
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								About Us
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5">
					<h5 className="sm:title5 title4">Service</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link href={"#"} className="underline">
								Store
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Sell / Consign
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Polishing and Services
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Shipping & Payments
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								FAQ
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Vacancies
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5">
					<h5 className="sm:title5 title4">Other Platforms</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Watch classnames={"w-6"} />}
								<p>Chrono 24</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay classnames={"w-6"} />}
								<p>Ebay</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay classnames={"w-6"} />}
								<p>Ebay Kleinanzeigen</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Instagram classnames={"w-6"} />}
								<p>Instagram</p>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5">
					<h5 className="sm:title5 title4">Legal</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link href={"#"} className="underline">
								Imprint
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Terms
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Withdrawal
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Disclaimer
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline">
								Cookie Policy
							</Link>
						</li>
					</ul>
				</div>
			</section>
			<section className="w-full sm:gap-0 gap-4 flex-col sm:flex-row flex justify-between items-center font-normal text-xs sm:tracking-normal tracking-wider">
				<p className="">Timedriven is an independent dealer and is not affiliated with any other brand, nor is it an authorized reseller.</p>
				<p className="">©2026 Timedriven. All Rights Reserved.</p>
				<div className="flex-center flex-wrap gap-4 sm:gap-3">
					<Link href={"#"} className="underline">
						Imprint
					</Link>
					<Link href={"#"} className="underline">
						Privacy Policy
					</Link>
					<Link href={"#"} className="underline">
						Terms
					</Link>
					<Link href={"#"} className="underline">
						Withdrawal
					</Link>
					<Link href={"#"} className="underline">
						Disclaimer
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
				</div>
			</section>
		</footer>
	);
}
