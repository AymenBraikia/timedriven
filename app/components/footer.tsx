import Link from "next/link";
import Instagram from "./svg/instagram";
import Watch from "./svg/watch";
import Ebay from "./svg/ebay";
import HorizontalLogo from "./svg/logo_horizontal";

export default function Footer() {
	return (
		<footer className="w-full py-8 md:px-15 lg:px-20 px-4 flex-center flex-col bg-background font-bold">
			<section className="w-full lg:h-75 lg:flex-row flex-col flex justify-between lg:items-center items-start">
				<div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
					<HorizontalLogo classnames={"w-64"} />
					<ul className="flex flex-col justify-start items-start gap-2 mr-[0.05rem] tracking-wider">
						<li>Walther-von-Cronberg-Platz 18</li>
						<li>60594 Frankfurt am Main</li>
						<li>Germany</li>
						<li>+49 152 5544 3810</li>
						<li>+49 69 7958 0766</li>
						<li>info@timedriven.de</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
					<h5 className="lg:title5 title4">Shop</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link aria-label="watches" href={"/info/shop"} className="underline">
								Watches
							</Link>
						</li>
						<li>
							<Link aria-label="spare parts" href={"/info/spare"} className="underline">
								Spare Parts
							</Link>
						</li>
						<li>
							<Link aria-label="favorites" href={"/info/favorites"} className="underline">
								Favorites
							</Link>
						</li>
						<li>
							<Link aria-label="about us" href={"/info/about"} className="underline">
								About Us
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
					<h5 className="lg:title5 title4">Service</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link aria-label="store" href={"/info/store"} className="underline">
								Store
							</Link>
						</li>
						<li>
							<Link aria-label="sell or consign" href={"/info/sell"} className="underline">
								Sell / Consign
							</Link>
						</li>
						<li>
							<Link aria-label="polishing and services" href={"/info/polishing"} className="underline">
								Polishing and Services
							</Link>
						</li>
						<li>
							<Link aria-label="shipping and payments" href={"/info/payments"} className="underline">
								Shipping & Payments
							</Link>
						</li>
						<li>
							<Link aria-label="Frequently Asked Questions" href={"/info/faq"} className="underline">
								FAQ
							</Link>
						</li>
						<li>
							<Link aria-label="Vacancies" href={"/info/vacancies"} className="underline">
								Vacancies
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
					<h5 className="lg:title5 title4">Other Platforms</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link aria-label="visit chrono 24" href={"#"} className="underline flex justify-start items-center gap-4">
								{<Watch classnames={"w-6"} />}
								<p>Chrono 24</p>
							</Link>
						</li>
						<li>
							<Link aria-label="ebay store" href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay classnames={"w-6"} />}
								<p>Ebay</p>
							</Link>
						</li>
						<li>
							<Link aria-label="ebay store" href={"#"} className="underline flex justify-start items-center gap-4">
								{<Ebay classnames={"w-6"} />}
								<p>Ebay Kleinanzeigen</p>
							</Link>
						</li>
						<li>
							<Link aria-label="instagram page" href={"#"} className="underline flex justify-start items-center gap-4">
								{<Instagram classnames={"w-6"} />}
								<p>Instagram</p>
							</Link>
						</li>
					</ul>
				</div>
				<div className="flex flex-col justify-start items-start gap-4 my-5 lg:my-0 lg:h-full">
					<h5 className="lg:title5 title4">Legal</h5>
					<ul className="flex flex-col justify-start items-start gap-2">
						<li>
							<Link aria-label="imprint" href={"/info/imprint"} className="underline">
								Imprint
							</Link>
						</li>
						<li>
							<Link aria-label="privacy policiy" href={"/info/policy"} className="underline">
								Privacy Policy
							</Link>
						</li>
						<li>
							<Link aria-label="terms of use" href={"/info/terms"} className="underline">
								Terms
							</Link>
						</li>
						<li>
							<Link aria-label="withdrawal" href={"/info/withdraw"} className="underline">
								Withdrawal
							</Link>
						</li>
						<li>
							<Link aria-label="disclaimer" href={"/info/disclaimer"} className="underline">
								Disclaimer
							</Link>
						</li>
						<li>
							<Link aria-label="cookies policy" href={"/info/cookies"} className="underline">
								Cookie Policy
							</Link>
						</li>
					</ul>
				</div>
			</section>
			<section className="w-full lg:gap-0 gap-4 flex-col lg:flex-row flex justify-between items-center font-normal text-xs lg:tracking-normal lg:mr-0 mr-[0.05rem] tracking-wider">
				<p className="">Timedriven is an independent dealer and is not affiliated with any other brand, nor is it an authorized reseller.</p>
				<p className="">©2026 Timedriven. All Rights Reserved.</p>
				<div className="flex-center flex-wrap gap-4 lg:gap-3">
					<Link aria-label="imprint" href={"/info/imprint"} className="underline">
						Imprint
					</Link>
					<Link aria-label="privacy policy" href={"/info/policy"} className="underline">
						Privacy Policy
					</Link>
					<Link aria-label="terms of use" href={"/info/terms"} className="underline">
						Terms
					</Link>
					<Link aria-label="withdrawal" href={"/info/withdraw"} className="underline">
						Withdrawal
					</Link>
					<Link aria-label="disclaimer" href={"/info/disclaimer"} className="underline">
						Disclaimer
					</Link>
					<Link aria-label="cookies policy" href={"/info/cookies"} className="underline">
						Cookie Policy
					</Link>
				</div>
			</section>
		</footer>
	);
}
