import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Imprint</h1>
            <div className="flex justify-center items-start flex-col gap-2 text-[14px]">
                <p className="font-bold">Frederik Schlüter</p>
                <p>Timedriven</p>
                <p>Walther-von-Cronberg-Platz 18</p>
                <p>60594 Frankfurt am Main</p>
                <p>Germany</p>
                <div className="flex-center gap-2">
                    <p className="font-bold">Phone number:</p> +49 (0) 152 5544 3810
                </div>
                <div className="flex-center gap-2">
                    <p className="font-bold">E-mail:</p> info@timedriven.de
                </div>
                <div className="flex-center gap-2">
                    <p className="font-bold">Sales tax identification number:</p> DE815913469
                </div>
                <div className="flex-center gap-2">
                    <p className="font-bold">Authorized representatives:</p> Frederik Schlüter
                </div>
                <br />
                <h6>Online Dispute Resolution Notice</h6>
                <p>
                    The European Commission provides a platform for online dispute resolution (OS) which can be found here. We are neither obliged nor willing to participate in a dispute settlement procedure before a consumer arbitration
                    board.
                </p>
            </div>
        </div>
    );
}
