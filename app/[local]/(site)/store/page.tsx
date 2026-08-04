import Link from "next/link";
import Map from "./map";
import Gallery from "./gallery";

export default function SellPage() {
    return (
        <div className="flex justify-start items-start flex-wrap w-full gap-10 py-20 px-20">
            <h1>Timedriven Store Frankfurt</h1>

            <div className="w-full flex justify-between items-start">
                <div className="w-[calc(50%-20px)]">
                    <div className="flex justify-center items-start flex-col gap-6 text-sm">
                        <Link className="title6 underline" href={"/booking"}>
                            Book an appointment
                        </Link>
                        <p className="">We look forward to welcoming you to our store soon.</p>
                        <p>Please make an appointment to ensure the watch you are looking for is available at your time of visit.</p>
                        <p>Additionally, note that for watches above 15.000€ an appointment is required.</p>
                    </div>
                    <div className="flex w-full mt-10 tracking-wider flex-wrap gap-10">
                        <div className="flex flex-col w-[calc(50%-30px)] gap-10 text-sm">
                            <h5>Address</h5>
                            <div className="flex flex-col gap-5">
                                <p>Walther-von-Cronberg-Platz 18 60594 Frankfurt am Main Germany</p>
                                <p>
                                    Parking: Park One garage in the same building{" "}
                                    <Link
                                        className="underline"
                                        href={
                                            "https://www.google.com/maps/place/PARK+ONE+Tiefgarage+Colosseo/@50.1053258,8.6941458,17z/data=!3m1!4b1!4m6!3m5!1s0x47bd0e9fcc2aec01:0xc150aeb0011da62c!8m2!3d50.1053224!4d8.6963345!16s%2Fg%2F11c2mdbn86"
                                        }
                                    >
                                        (see on Google Maps)
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col w-[calc(50%-30px)] gap-10">
                            <h5>Opening Hours</h5>
                            <div className="flex justify-between items-center flex-col text-sm">
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Monday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Tuesday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Wednesday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Thursday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Friday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Saturday</p>
                                    <p>11:00 – 17:00</p>
                                </div>
                                <div className="w-full flex justify-between items-center gap-4">
                                    <p>Sunday</p>
                                    <p>Closed</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col w-[calc(50%-30px)] gap-10">
                            <h5>Contact</h5>
                            <div className="flex justify-between items-start flex-col text-sm">
                                <p>+49 152 5544 3810</p>
                                <p>+49 69 7958 0766</p>
                                <p>info@timedriven.de</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Gallery />
            </div>
            <Map />
        </div>
    );
}
