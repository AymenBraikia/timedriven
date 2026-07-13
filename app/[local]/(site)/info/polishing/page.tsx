import Link from "next/link";

export default function PolishPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Polishing and Service</h1>
            <div className="flex justify-center items-start flex-col gap-6 text-[14px]">
                <p>
                    At Timedriven, we offer a first-class polishing and repair service for top-class brands such as Rolex, IWC, Tudor, Omega and Cartier. Our experienced watchmaker will get your watch in top shape – from precise polishing
                    to professional maintenance.
                </p>

                <h3>Our services at a glance:</h3>

                <div className="flex justify-start items-start flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Polishing & reconditioning:</h5>
                        <p>We remove scratches and minor signs of wear, restoring your watch to its original shine:</p>
                        <ul className="list-disc list-inside">
                            <li>Polishing & Refurbishment from €175</li>
                            <li>Polishing including material application & refurbishment from €249</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Maintenance & repair:</h5>
                        <p>We carry out all necessary repairs and provide a reliable maintenance service for your movement in our master workshop:</p>
                        <ul className="list-disc list-inside">
                            <li>Battery replacement for standard quartz models €45</li>
                            <li>Rate adjustment / regulation of the time deviation per day €79</li>
                            <li>Dial replacement (3 hands) €199</li>
                            <li>Dial replacement (chronograph) €249</li>
                            <li>Service for 3-hand manual wind watches from €499</li>
                            <li>Service for 3-hand automatic watches from €599 (e.g. Rolex, OMEGA, Panerai, etc.)</li>
                            <li>Service for chronographs from €749 (e.g. Rolex, OMEGA)</li>
                        </ul>
                        <p className="pt-2">Plus spare parts if necessary. For individual repairs, a cost estimate will be provided.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Expert professionals:</h5>
                        <p>Our watchmaker specializes in the care and repair of luxury watches.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Highest quality:</h5>
                        <p>We only use specialized tools that meet the highest standards.</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h5 className="font-semibold">Speed & reliability:</h5>
                        <p>We offer you fast processing times and reliable execution - so that your watch is back with you quickly.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
