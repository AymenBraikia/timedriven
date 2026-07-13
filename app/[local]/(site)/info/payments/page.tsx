export default function ShippingAndPaymentsPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Shipping and Payments</h1>
            <div className="flex justify-center items-start flex-col gap-6 text-[14px] w-full">
                <h3>Payments</h3>
                <p>Fast and secure online payments</p>
                <table className="w-full bg-background">
                    <thead>
                        <tr>
                            <th>Payment Method</th>
                            <th>Duration</th>
                            <th>Fees</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>National Bank Wire</td>
                            <td>1–2 business days</td>
                            <td>0%</td>
                        </tr>
                        <tr>
                            <td>International Bank Wire</td>
                            <td>2–3 business days</td>
                            <td>0%</td>
                        </tr>
                        <tr>
                            <td>PayPal</td>
                            <td>immediate</td>
                            <td>3%</td>
                        </tr>
                        <tr>
                            <td>Credit/Debit Payment</td>
                            <td>immediate</td>
                            <td>1.4%</td>
                        </tr>
                    </tbody>
                </table>

                <h3>Shipping</h3>
                <h5>Germany</h5>
                <p>Delivery within Germany: 1–2 business days.</p>
                <table className="w-full bg-background">
                    <thead>
                        <tr>
                            <th>Germany</th>
                            <th>Value</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DHL</td>
                            <td>Up to 500€</td>
                            <td>6€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>500€ – 10.000€</td>
                            <td>20€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>10.000€ – 15.000€</td>
                            <td>50€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>15.000€ – 25.000€</td>
                            <td>80€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>25.000€ – 50.000€</td>
                            <td>150€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>50.000€ – 250.000€</td>
                            <td>250€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>250.000€ and more</td>
                            <td>On request</td>
                        </tr>
                    </tbody>
                </table>

                <h5>European Union</h5>
                <p>Delivery within the European Union: 1–2 business days.</p>
                <table className="w-full bg-background">
                    <thead>
                        <tr>
                            <th>European Union</th>
                            <th>Value</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DHL</td>
                            <td>Up to 500€</td>
                            <td>15€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>500€ – 10.000€</td>
                            <td>50€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>10.000€ – 15.000€</td>
                            <td>150€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>15.000€ – 25.000€</td>
                            <td>300€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>25.000€ – 50.000€</td>
                            <td>400€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>50.000€ – 250.000€</td>
                            <td>500€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>250.000€ and more</td>
                            <td>On request</td>
                        </tr>
                    </tbody>
                </table>

                <h5>Worldwide</h5>
                <p>Worldwide delivery: 3–10 business days.</p>
                <table className="w-full bg-background">
                    <thead>
                        <tr>
                            <th>Worldwide</th>
                            <th>Value</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>DHL</td>
                            <td>Up to 500€</td>
                            <td>25€</td>
                        </tr>
                        <tr>
                            <td>DHL Express</td>
                            <td>500€ – 10.000€</td>
                            <td>100€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>10.000€ – 15.000€</td>
                            <td>150€</td>
                        </tr>
                        <tr>
                            <td>UPS</td>
                            <td>15.000€ – 25.000€</td>
                            <td>400€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>25.000€ – 50.000€</td>
                            <td>750€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>50.000€ – 250.000€</td>
                            <td>1.000€</td>
                        </tr>
                        <tr>
                            <td>Prosegur</td>
                            <td>250.000€ and more</td>
                            <td>On request</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
