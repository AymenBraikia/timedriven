import Link from "next/link";
import FooterLogo from "./svg/footer_logo";
import Instagram from "./svg/instagram";
import Watch from "./svg/watch";
import Ebay from "./svg/ebay";

export default function Footer() {
	return (
		<footer className="w-full py-8 px-20 flex-center flex-col bg-background font-bold">
			<section className="w-full flex justify-between items-center">
				<div className="flex flex-col justify-start items-start gap-4 min-h-75">
					<FooterLogo s={50} />
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>Walther-von-Cronberg-Platz 18</li>
						<li>60594 Frankfurt am Main</li>
						<li>Germany</li>
						<li>+49 152 5544 3810</li>
						<li>+49 69 7958 0766</li>
						<li>info@timedriven.de</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 min-h-75">
					<h5 className="title5">Shop</h5>
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
				<div className="flex flex-col justify-start items-start gap-4 min-h-75">
					<h5 className="title5">Service</h5>
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
				<div className="flex flex-col justify-start items-start gap-4 min-h-75">
					<h5 className="title5">Other Platforms</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Watch s={24} />}
								<p>Chrono 24</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay s={24} />}
								<p>Ebay</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay s={24} />}
								<p>Ebay Kleinanzeigen</p>
							</Link>
						</li>
						<li>
							<Link href={"#"} className="underline flex justify-start items-center gap-4">
								{<Instagram s={24} />}
								<p>Instagram</p>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 min-h-75">
					<h5 className="title5">Legal</h5>
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
			<section className="w-full flex justify-between items-center font-normal text-xs">
				<p className="">Timedriven is an independent dealer and is not affiliated with any other brand, nor is it an authorized reseller.</p>
				<p className="">©2026 Timedriven. All Rights Reserved.</p>
				<div className="flex-center gap-3">
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
					<Link href={"#"} className="underline">
						Cookie Policy
					</Link>
				</div>
			</section>
		</footer>
	);
}
