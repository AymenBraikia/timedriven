import Link from "next/link";

export default function Hero() {
	return (
		<section className="flex-col flex-center w-dvw h-dvh fixed top-0 left-0 -z-10 text-white">
			<video autoPlay muted loop playsInline className="w-full h-full object-cover brightness-50 absolute left-0 top-0 -z-10">
				<source src="/hero_vid.mp4" type="video/mp4" />
			</video>
			<div className="flex-center flex-col font-secondary fade-in">
				<h1 className="title1 tracking-widest">TIMEDRIVEN</h1>
				<h5 className="title5">Your partner for high-end watches</h5>
				<Link className="underline title6" href={"#"}>
					Discover
				</Link>
			</div>
		</section>
	);
}
