import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Terms & Conditions​</h1>
            <div className="flex justify-center items-start flex-col gap-6 text-[14px]">
                <h3>Index</h3>
                <ul className="list-disc list-inside text-[16px]">
                    <li>Scope</li>
                    <li>Offer, acceptance and conclusion of contract</li>
                    <li>Right of withdrawal</li>
                    <li>Prices and payment conditions</li>
                    <li>Shipping and conditions</li>
                    <li>Reservation of property rights</li>
                    <li>Liability for defects / warranty</li>
                    <li>Liability</li>
                    <li>Applicable law</li>
                    <li>Competent court</li>
                    <li>Alternative dispute resolution</li>
                    <li>Right of withdrawal from Frederik Schlüter in the event of delayed payment by the customer according to section 4.5</li>
                    <li>Identification obligation: Money Laundering Act</li>
                    <li>Obligation to inform according to the German Battery Act (BattG)</li>
                </ul>

                <p className="font-bold">Your use of the website timedriven.de constitutes your acceptance of the terms and conditions.</p>

                <h4 className="font-semibold">1. Scope</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        These general terms and conditions (below referred to as "T&C") apply to all contracts between a consumer or a company (below referred to as customer or buyer) and Frederik Schlüter (below referred to as "seller")
                        concerning products and services offered on www.timedriven.de.
                    </li>
                    <li>
                        Consumer: any natural person entering a contract not in the exercise of a trade or profession. Entrepreneur: any natural or legal person or partnership with legal capacity entering a contract in the exercise of a
                        trade or profession.
                    </li>
                    <li>Only the terms and conditions stated here at the time of the agreement apply. Frederik Schlüter does not recognize deviating terms of the customer unless expressly agreed.</li>
                </ul>

                <h4 className="font-semibold">2. Offer, acceptance and conclusion of contract</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>Every offer made by Frederik Schlüter is non-binding and is to be understood as an invitation to the consumer to provide a counter-offer.</li>
                    <li>When an order is placed, an offer is sent to Frederik Schlüter to conclude a purchase agreement. Acceptance is subject to the availability of the goods.</li>
                    <li>The acceptance of an order is sent via e‑mail with the purchase details as well as invoice. This written order confirmation represents the acceptance of the order placed by the customer.</li>
                    <li>
                        Frederik Schlüter reserves the right to cancel or reject an order without being liable for any damages in the following situations:
                        <ul className="list-disc list-inside ml-6">
                            <li>The ordered product is out of stock.</li>
                            <li>The order placed is suspected to be fraudulent.</li>
                            <li>There are errors in the product description, price or images.</li>
                            <li>Delivery to the consumer is not possible due to shipping limitations.</li>
                            <li>The customer does not pay the purchase price within the time frame indicated in section 4.5.</li>
                        </ul>
                    </li>
                </ul>

                <h4 className="font-semibold">3. Right of withdrawal</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>If the customer is a consumer, he has a right of withdrawal.</li>
                    <li>Further information on the right of withdrawal can be found in the seller's right of withdrawal policy.</li>
                    <li>The customer will only have to pay for any loss in value if this loss in value is due to handling of the goods not necessary to test the condition, properties and functioning of the goods.</li>
                    <li>
                        The right of withdrawal does not apply to consumers who do not belong to a member state of the European Union at the time the contract is concluded and whose sole place of residence and/or delivery address are
                        outside the European Union at the time the contract is concluded.
                    </li>
                    <li>
                        For consumers who have their habitual residence in a country that does not belong to the European Union (EU) or the European Economic Area (EEA), German law applies excluding the United Nations Convention on
                        Contracts for the International Sale of Goods (CISG) and German consumer protection law as applicable.
                    </li>
                </ul>

                <h4 className="font-semibold">4. Prices and payment conditions</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>All prices on www.timedriven.de are in euros and include VAT where applicable. If the product is differentially taxed the VAT is not deductible.</li>
                    <li>All payment options are listed in the product description. Payment fees, shipping costs and/or import sales taxes are to be paid by the customer.</li>
                    <li>Frederik Schlüter will only commence dispatch after receipt of the full purchase price and payment of any shipping costs incurred by the customer.</li>
                    <li>In the order confirmation e‑mail, the customer obtains the final price including VAT and/or shipping costs. The total price is due upon receipt of the order confirmation e‑mail.</li>
                    <li>The customer is obliged to pay the whole price within three days of receiving the order confirmation e‑mail. If the customer does not pay within five days, the seller is entitled to cancel the order.</li>
                </ul>

                <h4 className="font-semibold">5. Shipping and conditions</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>The product is sent to the address provided by the customer. If a mistake has been made and the shipping address needs to be changed, the customer should contact the seller as soon as possible.</li>
                    <li>If the carrier is unable to deliver and the good is sent back to the seller, the customer must pay any further shipping costs unless prevented by a severe impediment.</li>
                    <li>If the customer acts as a consumer, the risk of accidental loss and accidental deterioration of the goods only passes when the goods are handed over to the customer or a person authorized to receive them.</li>
                    <li>Every item can be personally picked up at the product location if specified in the product description.</li>
                    <li>Every item is shipped as soon as possible, usually within 1-3 business days after receipt of payment.</li>
                    <li>In case of transport damage, the customer must contact the seller immediately. Any claims for transport damages not communicated within 1-2 days of receipt are not valid.</li>
                    <li>If the customer is an entrepreneur, the risks associated with the transport lie with the buyer.</li>
                </ul>

                <h4 className="font-semibold">6. Reservation of property rights</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>For customers: The seller maintains the property rights of every product until the receipt of payment.</li>
                    <li>For entrepreneurs: The seller maintains the property rights of every product until the buyer has fulfilled every requirement of the business relationship.</li>
                </ul>

                <h4 className="font-semibold">7. Liability for defects / warranty</h4>
                <p className="ml-4">7.1 For consumers:</p>
                <ul className="list-disc list-inside ml-8">
                    <li>If the purchased item is defective, the legal regulations regarding liability for defects apply.</li>
                    <li>
                        The warranty period of used items is one year starting on the day the item is delivered with exception of the following situations: customer claims for damages and reimbursement of expenses; fraudulent concealment of
                        a defect by the seller.
                    </li>
                    <li>
                        An item will be excluded from warranty in the following situations: the item has not been properly used; the customer has not informed the seller about transport damages within the time frame stated; the customer
                        tries to repair the watch by himself or third party without informing the seller.
                    </li>
                    <li>Excluded from the warranty are waterproofness issues, usual signs of wear (e.g. scratches on the bracelet/case and wear of threads) and watch precision deviations caused by normal wear and tear.</li>
                    <li>Frederik Schlüter is not liable for defects caused by improper handling of the object of purchase by the buyer or third parties.</li>
                </ul>

                <p className="ml-4">7.2 For entrepreneurs:</p>
                <ul className="list-disc list-inside ml-8">
                    <li>If the purchased item is defective, the seller decides about the subsequent procedure.</li>
                    <li>Any claim concerning the function of a used item is in principle not valid.</li>
                </ul>

                <h4 className="font-semibold">8. Liability</h4>
                <p className="ml-4">The seller is liable to the customer for all contractual, quasi-contractual and statutory claims for damages as follows:</p>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        The seller is only unlimited liable under the following conditions: damage caused by intent or recklessness of Frederik Schlüter; warranty compromise unless agreed otherwise; obligatory liability as stated in the
                        Product Liability Law.
                    </li>
                    <li>If the seller negligently violates an essential contractual obligation, liability is limited to foreseeable damage typical of the contract unless liability is unlimited by law.</li>
                    <li>Apart from that, liability on the part of the seller is excluded, including for vicarious agents and legal representatives.</li>
                </ul>

                <h4 className="font-semibold">9. Applicable law</h4>
                <p className="ml-4">
                    These T&C are applicable in accordance with German law excluding the laws governing the international purchase of movable goods. For consumers, this choice of law applies insofar as the protection granted is not
                    withdrawn by mandatory provisions of the law of the state in which the consumer has his habitual residence. The CISG does not apply.
                </p>

                <h4 className="font-semibold">10. Competent court</h4>
                <p className="ml-4">
                    If the customer acts as a merchant or legal entity under public law, the exclusive place of jurisdiction for all disputes arising from this contract is the place of business of the seller in the Federal Republic of
                    Germany. If the customer is based outside the territory of the Federal Republic of Germany, the seller's place of business is the exclusive place of jurisdiction for all disputes.
                </p>

                <h4 className="font-semibold">11. Alternative dispute resolution</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        The EU Commission provides an online platform to solve disputes: https://ec.europa.eu/consumers/odr. This platform serves as a contact point for out-of-court settlement of disputes arising from online purchase or
                        service contracts.
                    </li>
                    <li>The seller is not obliged to participate in the dispute resolution procedure.</li>
                </ul>

                <h4 className="font-semibold">12. Right of withdrawal from Frederik Schlüter in the event of delayed payment by the customer according to section 4.5</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>
                        If the customer does not meet his payment obligations within the period specified under section 4.5, Frederik Schlüter is entitled to withdraw from the contract without prior notice. Any partial payments made by the
                        customer will be returned within a maximum of 21 days.
                    </li>
                    <li>The declaration of withdrawal is made in writing by e‑mail.</li>
                </ul>

                <h4 className="font-semibold">13. Identification Obligation: Money Laundering Act</h4>
                <ul className="list-disc list-inside ml-4">
                    <li>For cash transactions over 10,000 euros there is an identification obligation according to the Money Laundering Act.</li>
                    <li>For consumers: To verify the identity of the customer an internationally accepted valid identity document is needed (e.g. passport).</li>
                    <li>For entrepreneurs: To verify the identity of an entrepreneur an excerpt from the commercial or cooperatives register may be requested.</li>
                </ul>

                <h4 className="font-semibold">14. Obligation to Inform according to the German Battery Act (BattG)</h4>
                <p className="ml-4">
                    Discharged batteries are special waste and should not be disposed of in domestic waste. Every customer can send us old batteries and we will correctly dispose of them. Pollutant batteries containing toxic substances are
                    marked with the sign and thresholds:
                </p>
                <ul className="list-disc list-inside ml-6">
                    <li>"Cd" Battery contains more than 0.002% cadmium</li>
                    <li>"Hg" Battery contains more than 0.0005% mercury</li>
                    <li>"Pb" Battery contains more than 0.004% lead</li>
                </ul>
            </div>
        </div>
    );
}
