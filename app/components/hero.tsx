import Link from "next/link";

export default function Hero() {
	return (
		<section className="flex-col flex-center w-dvw h-dvh fixed top-0 left-0 -z-10 text-white">
			<video aria-hidden="true" tabIndex={-1} autoPlay muted loop playsInline preload="auto" poster="/hero_placeholder.webp" className="w-full h-full object-cover brightness-50 absolute left-0 top-0 -z-10">
				{/* Fallback format second */}
				<source src="/hero_vid.mp4" type="video/mp4" />
				{/* Text fallback for incredibly old browsers */}
				Your browser does not support the video tag.
			</video>
			<div className="flex-center flex-col font-secondary fade-in">
				<h1 className="sm:title1 title2 tracking-[0.8rem] ">TIMEDRIVEN</h1>
				<h5 className="sm:title5 title6 tracking-wider">Your partner for high-end watches</h5>
				<Link aria-label="discover" className="underline sm:title6 text-[18px] tracking-widest" href={"#"}>
					Discover
				</Link>
			</div>
		</section>
	);
}
