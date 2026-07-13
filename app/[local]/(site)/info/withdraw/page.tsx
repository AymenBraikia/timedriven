export default function AboutPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Right of Withdrawal</h1>

            <div className="flex justify-center items-start flex-col gap-6 text-[14px] w-full max-w-3xl">
                <p>Right of withdrawal for customers of the online webshop www.timedriven.de.</p>

                <h4 className="font-semibold">Right of withdrawal</h4>
                <ol className="list-decimal list-inside ml-4">
                    <li>If the customer is a consumer (as defined in our T&C) and has entered a distance agreement or an agreement as stated in section 3.2 BGB with Timedriven, Frederik Schlüter then holds:</li>
                    <li>The consumer has 14 days from product receipt date to withdraw from the agreement without giving any reason.</li>
                    <li>
                        To exercise the right of withdrawal the consumer must inform us (Frederik Schlüter, Walther-von-Cronberg-Platz 18, 60594 Frankfurt am Main, info@timedriven.de, +49 (0) 152 5544 3810) in writing with a clear
                        declaration of withdrawal by e‑mail or by sending us a letter to the above mentioned address. To meet the deadline it is sufficient to submit the clear declaration of withdrawal within the cancellation period.
                    </li>
                </ol>

                <h4 className="font-semibold">Consequences of withdrawal</h4>
                <ol className="list-decimal list-inside ml-4">
                    <li>
                        If you revoke this contract, we shall reimburse you for all payments we have received from you, including delivery costs (except additional costs resulting from choosing a type of delivery other than the least
                        expensive standard delivery offered by us), without undue delay and in any event not later than fourteen days from the day on which we receive the notification of your withdrawal.
                    </li>
                    <li>
                        You must return the goods to us immediately and in any event no later than fourteen days from the day on which you notify us of the withdrawal. You will only have to pay for any loss in value of the goods that is due
                        to handling other than what is necessary to establish the nature, characteristics and functioning of the goods.
                    </li>
                </ol>

                <h4 className="font-semibold">Withdrawal form</h4>
                <p className="ml-4">(If you want to withdraw from the contract, please complete and return this form.)</p>

                <form className="w-full mt-4 flex flex-col gap-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium">Order number</label>
                            <input required type="text" className="outline-none mt-1 block w-full border-b border-gray-300 px-3 py-2" name="orderNumber" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input required type="email" className="outline-none mt-1 block w-full border-b border-gray-300 px-3 py-2" name="email" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <div>
                            <label className="block text-sm font-medium">First name</label>
                            <input required type="text" className="outline-none mt-1 block w-full border-b border-gray-300 px-3 py-2" name="firstName" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last name</label>
                            <input required type="text" className="outline-none mt-1 block w-full border-b border-gray-300 px-3 py-2" name="lastName" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Comment (optional)</label>
                        <textarea className="outline-none mt-1 block w-full border border-gray-300 rounded px-3 py-2" rows={4} name="comment" />
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="submit" className="button px-4 py-2 rounded cursor-pointer">
                            Confirm withdrawal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
