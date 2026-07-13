import Form from "./form";

export default function BookingPage() {
    return (
        <div className="flex-center flex-col gap-6 py-8 sm:px-20 px-6">
            <h1 className="font-semibold font-secondary">Book an Appointment</h1>
            <p className="tracking-widest leading-6">
                We look forward to welcoming you to our store soon. Please make an appointment to ensure the watch you are looking for is available at the time of your visit. Additionally, note that for watches above 15.000€ an appointment
                is required.
            </p>
            <Form />
        </div>
    );
}
