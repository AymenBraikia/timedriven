import Dropdown from "@/app/components/dropdown";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Frequently Asked Questions​</h1>
            <div className="flex justify-center items-start flex-col gap-6 w-full">
                <h2 className="font-medium">Payments</h2>
                <Dropdown titles={["What payment methods do you offer?", "Do you accept cash on delivery payments or payments after receipt of invoice?", "Is it possible to trade a watch?", "Do you accept payment in installments?"]}>
                    <ul className="list list-disc">
                        <li>Online: bank transfer, Paypal (+3%), credit card (+1.4%)</li>
                        <li>In store: instant payment, Paypal, credit card, cash (Personal ID required)</li>
                    </ul>
                    <p>Unfortunately we can only accept advance or instant payments</p>
                    <p>Generally, yes. We are happy to prepare an offer for you. Please contact us with details about your watch.</p>
                    <p>At the moment we can’t accept payment in installments.</p>
                </Dropdown>

                <h2 className="font-medium">Watches</h2>
                <Dropdown
                    titles={[
                        "What is included in the delivery?",
                        "Can I see the products in person before buying?",
                        "Is it possible to reserve a watch?",
                        "How can I be sure about the condition of a watch?",
                        "Can you verify the authenticity of a watch?",
                        "Can I take my watch back to you for service and maintenance?",
                        "Do you guarantee water resistance or waterproofness?",
                        "Do you fit watches to small or large wrists?",
                        "What happens if the watch is lost during shipping?",
                        "What are your delivery times?",
                        "Can you ship to a specific date?",
                        "What happens if I miss a delivery?",
                    ]}
                >
                    <p>The scope of delivery varies. We always clearly lay out what’s included in the product description. The scope of delivery is also shown on the last listing image.</p>
                    <div className="flex flex-col gap-2">
                        <p>
                            We’ll be happy to present our products and answer any questions at our store. Kindly{" "}
                            <Link className="underline" href={"/info/faq/#"}>
                                make an appointment
                            </Link>
                        </p>
                        <p>Please note that for watches above 15.000€ an appointment is required.</p>
                    </div>
                    <p>We’re sorry but we can’t reserve watches for you.</p>
                    <p>The condition of each watch is spelled out in the listing description and shown in up-to-date high resolution product images.</p>
                    <p>We don’t offer authentication of watches that haven’t been purchased from us.</p>
                    <p>We don’t currently offer repair or maintenance.</p>
                    <p>No, water resistance is not part of the warranty.</p>
                    <p>
                        In most cases, our watches are wearable for a wrist size (circumference) of 19cm. For smaller wrists we can shorten the bracelet by taking out links. For larger wrists we can insert additional links if we have them
                        available.
                    </p>
                    <p>If the watch gets lost on the way to you we will fully refund your order.</p>
                    <p>
                        For more information about shipping please see our page on{" "}
                        <Link className="underline" href={"/info/payments"}>
                            Shipping & Payments
                        </Link>
                        .
                    </p>
                    <p>We will be happy to time your delivery. Please let us know your desired shipping date in advance.</p>
                    <p>Generally the courier will attempt delivery for a second time if the first try was unsuccessful. For watches with a value of up to 25.000€ you can track your delivery using the shipment ID.</p>
                </Dropdown>

                <h2 className="font-medium">Withdrawal and Warranty</h2>
                <Dropdown titles={["Can I return the watch?", "For how long is the implied warranty valid for my watch?"]}>
                    <p>You may exercise your right of withdrawal for order with shipping for 14 days. We can only accept products in unchanged condition</p>
                    <p>Warranty is valid for one year after purchase.</p>
                </Dropdown>
            </div>
        </div>
    );
}
