import Image from "next/image";
import Link from "next/link";
import services_src from "../../public/polish.webp";
import sell_src from "../../public/sell.webp";
import spare_src from "../../public/spare.webp";
import FadeInObserver from "./fade_wrapper";

export default function Services() {
	return (
		<FadeInObserver>
			<div className={`w-full h-fit flex-center gap-8 flex-col sm:flex-row p-4 py-20 sm:p-0`}>
				<Link aria-label="sell or consign" href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={sell_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
						<h4 className="title4">Sell / Consign</h4>
						<h5 className="underline title5">Learn more</h5>
					</div>
				</Link>
				<Link aria-label="spare parts" href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={spare_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
						<h4 className="title4">Spare Parts</h4>
						<h5 className="underline title5">Go to shop</h5>
					</div>
				</Link>
				<Link aria-label="polishing and services" href={"#"} className="sm:w-120 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(maxWidth: 100dvw) 100vw, 100dvw" src={services_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col liquid-glass p-2 text-primary">
						<h4 className="title4">Polishing & Services</h4>
						<h5 className="underline title5">Learn more</h5>
					</div>
				</Link>
			</div>
		</FadeInObserver>
	);
}
