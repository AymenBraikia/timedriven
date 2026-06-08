import Image from "next/image";
import Link from "next/link";
import services_src from "../../public/polish.webp";
import sell_src from "../../public/sell.webp";
import spare_src from "../../public/spare.webp";
import FadeInObserver from "./fade_wrapper";

export default function Services() {
	return (
		<FadeInObserver>
			<div className={`w-full h-fit flex-center gap-8 flex-col lg:flex-row p-4 py-20 md:p-20 lg:py-0`}>
				<Link aria-label="sell or consign" href={"#"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" src={sell_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col p-2 text-primary bg-black/10 frost">
						<h4 className="title4">Sell / Consign</h4>
						<h5 className="underline title5">Learn more</h5>
					</div>
				</Link>
				<Link aria-label="spare parts" href={"#"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" src={spare_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col p-2 text-primary bg-black/10 frost">
						<h4 className="title4">Spare Parts</h4>
						<h5 className="underline title5">Go to shop</h5>
					</div>
				</Link>
				<Link aria-label="polishing and services" href={"#"} className="md:max-w-150 lg:min-w-1/3 aspect-square w-full flex flex-col justify-start items-start relative">
					<div className="relative w-full h-full transition brightness-100 overflow-hidden group">
						<Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw" src={services_src} fill alt="Sell / Consign" className="object-cover object-center select-none" />
					</div>
					<div className="absolute left-4 bottom-4 flex flex-col p-2 text-primary bg-black/10 frost">
						<h4 className="title4">Polishing & Services</h4>
						<h5 className="underline title5">Learn more</h5>
					</div>
				</Link>
			</div>
		</FadeInObserver>
	);
}
