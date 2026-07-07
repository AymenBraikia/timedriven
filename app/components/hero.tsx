import Link from "next/link";

export default function Hero() {
	return (
		<section className="flex-col flex-center w-dvw h-dvh fixed top-0 left-0 text-white">
			<video aria-hidden="true" tabIndex={-1} autoPlay muted loop playsInline preload="auto" poster="/hero_placeholder.webp" className="w-full h-full object-cover brightness-50 absolute left-0 top-0 -z-10">
				<source src="/hero_vid.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="flex-center flex-col font-secondary fade-in">
				<h1 className="sm:title1 title3 tracking-[0.8rem] mr-[0.8rem]">TIMEDRIVEN</h1>
				<h5 className="sm:title5 title6 mr-[0.05rem] tracking-wider">Your partner for high-end watches</h5>
				<Link aria-label="discover" className="underline sm:title6 text-[18px] mr-[0.1rem]" href={"#new"}>
					Discover
				</Link>
			</div>
		</section>
	);
}
