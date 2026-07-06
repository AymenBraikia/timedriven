import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>About Us</h1>
            <div className="flex justify-center items-start flex-col gap-6 text-[14px]">
                <p>
                    Our story began with a spark—an elegant timepiece worn by a legendary British agent that ignited a lifelong passion in our founder, Frederik Schlüter. This fascination with horology transformed Frederik from a young
                    enthusiast into a distinguished dealer of high-end timepieces. In 2019, while pursuing his degree in mechanical engineering, he established the company originally known as FFSWATCHES, channeling his obsession into a
                    thriving business dedicated to iconic wristwatches.
                </p>
                <p className="text-[16px] font-medium">
                    At Timedriven, we are your trusted experts for exquisite timepieces both new and pre-owned. Our expertise is driven by passion: we offer only the finest timepieces, each one a piece we would proudly wear ourselves. Our
                    in-house watchmaker meticulously inspects every watch to ensure its authenticity and optimal performance, providing you with confidence in your purchase.
                </p>
                <div>
                    <p>Our team and in-house watch maker meticulously inspects every watch before selling it to guarantee its authenticity and performance.</p>
                    <br />
                    <p>Looking to add to your collection? We offer an impressive selection of prestigious brands.</p>
                    <br />
                    <p>Our brands: Rolex, Cartier, Audemars Piguet, Patek Philippe, Omega, Tudor, IWC, Glashütte, Breitling and more</p>
                </div>
                <p>
                    Do you have a piece you’d like to sell? We are always on the lookout for exceptional watches. Whether you wish to sell outright or consign your timepiece, we offer seamless and trustworthy solutions tailored to your
                    needs.
                </p>
                <div className="flex flex-col gap-4">
                    <Link href="/sell" className="underline">
                        Sell your watch
                    </Link>
                    <Link href="/consignment" className="underline">
                        Consignment
                    </Link>
                </div>
            </div>
        </div>
    );
}
