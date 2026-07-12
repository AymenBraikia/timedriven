export default function polishPage() {
    return (
        <div className="flex flex-col justify-start items-start gap-6 py-6 sm:px-20 px-6">
            <h1 className="font-semibold font-secondary">Polishing and Service</h1>
            <p className="tracking-widest leading-6">
                At Timedriven, we offer a first-class polishing and repair service for top-class brands such as Rolex, IWC, Tudor, Omega and Cartier. Our experienced watchmaker will get your watch in top shape – from precise polishing to
                professional maintenance.
            </p>
            <h2 className="font-secondary">Our services at a glance:</h2>

            <div className="flex flex-col justify-start items-start gap-2">
                <h5 className="font-medium font-secondary">Polishing & reconditioning:</h5>
                <p className="tracking-widest leading-6">We remove scratches and minor signs of wear, restoring your watch to its original shine:</p>
                <p className="tracking-widest leading-6 text-sm">
                    - Polishing & Refurbishment from €175 <br />- Polishing including material application & refurbishment from €249
                </p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                <h5 className="font-medium font-secondary">Maintenance & repair:</h5>
                <p className="tracking-widest leading-6">We carry out all necessary repairs and provide a reliable maintenance service for your movement in our master workshop:</p>
                <p className="tracking-widest leading-6 text-sm">
                    - Battery replacement for standard quartz models €45 <br />
                    - Rate adjustment / reulation of the time deviation per day €79 <br />
                    - Dial replacement (3 hands) €199 <br />
                    - Dial replacement (chronograph) €249 <br />
                    - Service for 3-hand manual wind watches from €499 <br />
                    - Service for 3-hand automatic watches from €599 (e.g. Rolex, OMEGA, Panerai, etc.) <br />- Service for chronographs from €749 (e.g. Rolex, OMEGA)
                </p>
                <p className="tracking-widest leading-6">Plus spare parts if necessary. For individual repairs, a cost estimate will be provided.</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                <h5 className="font-medium font-secondary">Expert professionals:</h5>
                <p className="tracking-widest leading-6">Our watchmaker specializes in the care and repair of luxury watches.</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                <h5 className="font-medium font-secondary">Highest quality:</h5>
                <p className="tracking-widest leading-6">We only use specialized tools that meet the highest standards.</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-2">
                <h5 className="font-medium font-secondary">Speed & reliability:</h5>
                <p className="tracking-widest leading-6">We offer you fast processing times and reliable execution - so that your watch is back with you quickly.</p>
            </div>
        </div>
    );
}
