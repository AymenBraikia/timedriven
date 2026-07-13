import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="flex justify-center items-start flex-col w-full gap-10 py-20">
            <h1>Privacy Policy</h1>
            <div className="flex justify-center items-start flex-col gap-8 text-[14px]">
                <p>
                    Personal data (usually referred to just as “data” below) will only be processed by us to the extent necessary and for the purpose of providing a functional and user-friendly website, including its contents, and the
                    services offered there.
                </p>
                <p>
                    Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation (hereinafter referred to as the “GDPR”), “processing” refers to any operation or set of operations such as collection, recording,
                    organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment, or combination, restriction, erasure, or
                    destruction performed on personal data, whether by automated means or not.
                </p>
                <p>
                    The following privacy policy is intended to inform you in particular about the type, scope, purpose, duration, and legal basis for the processing of such data either under our own control or in conjunction with others.
                    We also inform you below about the third-party components we use to optimize our website and improve the user experience which may result in said third parties also processing data they collect and control.
                </p>
                <p>Our privacy policy is structured as follows:</p>
                <ul className="list-disc ml-4">
                    <li>Information about us as controllers of your data</li>
                    <li>The rights of users and data subjects</li>
                    <li>Information about the data processing</li>
                </ul>
            </div>
            <ul className="list-decimal">
                <li className="text-[36px]">
                    Information about us as controllers of your data
                    <div className="text-[14px]">
                        <p>The party responsible for this website (the “controller”) for purposes of data protection law is:</p>

                        <br />
                        <p>
                            Timedriven, Frederik Schlüter
                            <br />
                            Walther-von-Cronberg-Platz 18
                            <br />
                            60594 Frankfurt am Main
                            <br />
                            Germany
                            <br />
                            <br />
                            Telephone: +49 (0) 15255443810
                            <br />
                            E-mail: info@timedriven.de
                            <br />
                            <br />
                            The controller’s data protection officer is: Frederik Schlüter
                        </p>
                    </div>
                </li>

                <li className="text-[36px]">
                    The rights of users and data subjects
                    <div className="text-[14px] flex flex-col gap-8">
                        <p>With regard to the data processing to be described in more detail below, users and data subjects have the right</p>

                        <ul className="list-disc ml-4">
                            <li>
                                to confirmation of whether data concerning them is being processed, information about the data being processed, further information about the nature of the data processing, and copies of the data (cf. also
                                Art. 15 GDPR);
                            </li>
                            <li>to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);</li>
                            <li>
                                to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or, alternatively, if further processing is necessary as stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per Art. 18
                                GDPR;
                            </li>
                            <li>to receive copies of the data concerning them and/or provided by them and to have the same transmitted to other providers/controllers (cf. also Art. 20 GDPR);</li>
                            <li>to file complaints with the supervisory authority if they believe that data concerning them is being processed by the controller in breach of data protection provisions (see also Art. 77 GDPR).</li>
                        </ul>
                        <p>
                            In addition, the controller is obliged to inform all recipients to whom it discloses data of any such corrections, deletions, or restrictions placed on processing the same per Art. 16, 17 Para. 1, 18 GDPR.
                            However, this obligation does not apply if such notification is impossible or involves a disproportionate effort. Nevertheless, users have a right to information about these recipients.
                        </p>

                        <p className="font-bold">
                            Likewise, under Art. 21 GDPR, users and data subjects have the right to object to the controller’s future processing of their data pursuant to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data
                            processing for the purpose of direct advertising is permissible.
                        </p>
                    </div>
                </li>

                <li className="text-[36px]">
                    Information about the data processing
                    <div className="text-[14px] flex flex-col gap-8">
                        <p>
                            Your data processed when using our website will be deleted or blocked as soon as the purpose for its storage ceases to apply, provided the deletion of the same is not in breach of any statutory storage
                            obligations or unless otherwise stipulated below.
                        </p>
                        <h6>Use of PayPal as a payment method</h6>
                        <p>
                            If you decide to pay with the online payment service provider PayPal during your order process, your contact data is transmitted to PayPal as part of the order thus triggered. PayPal is an offer of PayPal
                            (Europe) S.à.r.l. & Cie. S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg. PayPal thereby assumes the function of an online payment service provider and a trustee and offers buyer protection services.
                        </p>
                        <p>
                            The personal data transmitted to PayPal is mostly first name, last name, address, telephone number, IP address, e-mail address, or other data, which is required for order processing,as well as data related to the
                            order, such as the number of items, item number, invoice amount and tax percentage, billing information, etc.
                        </p>
                        <p>
                            This transmission is necessary to process your order with the payment method you have selected, in particular to confirm your identity, to administer your payment and the customer relationship. Your data is
                            therefore transmitted to PayPal on the basis of Article 6 para. 1 lit. b GDPR.
                        </p>
                        <p>
                            However, please note: PayPal may transfer the personal data to service providers, to subcontractors or other affiliated companies, to the extent necessary to fulfill the contractual obligations arising from your
                            order or to process the data in the order on your behalf.
                        </p>
                        <p>
                            Depending on the payment method selected via PayPal, e.g., invoice or direct debit, the personal data transmitted to PayPal will be transmitted to credit agencies by PayPal. This transmission is used to check
                            your identity and creditworthiness in relation to the order you have placed. For information on which credit agencies are involved and which data is generally collected, processed, saved and forwarded by PayPal,
                            please refer to PayPal’s data protection statement at <br />
                            <Link href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" className="underline">
                                https://www.paypal.com/de/webapps/mpp/ua/privacy-full
                            </Link>
                        </p>
                        <h6>Cookies</h6>
                        <ul className="list-disc ml-4">
                            <li className="font-bold">
                                Session cookies
                                <div className="flex justify-center items-start flex-col font-normal gap-4">
                                    <p>
                                        We use cookies on our website. Cookies are small text files or other storage technologies stored on your computer by your browser. These cookies process certain specific information about you, such as
                                        your browser, location data, or IP address.
                                    </p>
                                    <p>This processing makes our website more user-friendly, efficient, and secure, allowing us, for example, to display our website in different languages or to offer a shopping cart function.</p>
                                    <p>The legal basis for such processing is Art. 6 Para. 1 lit. b) GDPR, insofar as these cookies are used to collect data to initiate or process contractual relationships.</p>
                                    <p>If the processing does not serve to initiate or process a contract, our legitimate interest lies in improving the functionality of our website. The legal basis is then Art. 6 Para. 1 lit. f) GDPR.</p>
                                    <p>When you close your browser, these session cookies are deleted.</p>
                                </div>
                            </li>
                            <li className="font-bold">
                                Third-party cookies
                                <div className="flex justify-center items-start flex-col font-normal gap-4">
                                    <p>If necessary, our website may also use cookies from companies with whom we cooperate for the purpose of advertising, analyzing, or improving the features of our website.</p>
                                    <p>Please refer to the following information for details, in particular for the legal basis and purpose of such third-party collection and processing of data collected through cookies.</p>
                                </div>
                            </li>
                            <li className="font-bold">
                                Disabling cookies
                                <div className="flex justify-center items-start flex-col font-normal gap-4">
                                    <p>
                                        You can refuse the use of cookies by changing the settings on your browser. Likewise, you can use the browser to delete cookies that have already been stored. However, the steps and measures required
                                        vary, depending on the browser you use. If you have any questions, please use the help function or consult the documentation for your browser or contact its maker for support. Browser settings cannot
                                        prevent so-called flash cookies from being set. Instead, you will need to change the setting of your Flash player. The steps and measures required for this also depend on the Flash player you are
                                        using. If you have any questions, please use the help function or consult the documentation for your Flash player or contact its maker for support.
                                    </p>
                                    <p>If you prevent or restrict the installation of cookies, not all of the functions on our site may be fully usable.</p>
                                </div>
                            </li>
                        </ul>
                        <h6>Youtube</h6>
                        <p>
                            We maintain an online presence on YouTube to present our company and our services and to communicate with customers/prospects. YouTube is a service of Google Ireland Limited, Gordon House, Barrow Street, Dublin
                            4, Ireland, a subsidiary of Google LLC, 1600 Amphitheater Parkway, Mountain View, CA 94043 USA.
                        </p>
                        <p>
                            We would like to point out that this might cause user data to be processed outside the European Union, particularly in the United States. This may increase risks for users that, for example, may make subsequent
                            access to the user data more difficult. We also do not have access to this user data. Access is only available to YouTube.
                        </p>
                        <p>The YouTube privacy policy can be found here:</p>
                        <Link href="https://policies.google.com/privacy" className="underline">
                            https://policies.google.com/privacy
                        </Link>
                        <h6>Facebook</h6>
                        <p>To advertise our products and services as well as to communicate with interested parties or customers, we have a presence on the Facebook platform.</p>
                        <p>On this social media platform, we are jointly responsible with Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Ireland.</p>
                        <p>The data protection officer of Facebook can be reached via this contact form:</p>
                        <Link href="https://www.facebook.com/help/contact/5409779486302970" className="underline">
                            https://www.facebook.com/help/contact/5409779486302970
                        </Link>
                        <p>
                            We have defined the joint responsibility in an agreement regarding the respective obligations within the meaning of the GDPR. This agreement, which sets out the reciprocal obligations, is available at the
                            following link:
                        </p>
                        <Link href="https://www.facebook.com/legal/terms/page_controller_addendum" className="underline">
                            https://www.facebook.com/legal/terms/page_controller_addendum
                        </Link>
                        <p>
                            The legal basis for the processing of the resulting and subsequently disclosed personal data is Art. 6 para. 1 lit. f GDPR. Our legitimate interest lies in the analysis, communication, sales, and promotion of our
                            products and services.
                        </p>
                        <p>
                            The legal basis may also be your consent per Art. 6 para. 1 lit. a GDPR. If lit. a GDPR granted to the platform operator. Per Art. 7 para. 3 GDPR, you may revoke this consent with the platform operator at any
                            time with future effect.
                        </p>
                        <p>When accessing our online presence on the Facebook platform, Facebook Ireland Ltd. as the operator of the platform in the EU will process your data (e.g. personal information, IP address, etc.).</p>
                        <p>
                            This data of the user is used for statistical information on the use of our company presence on Facebook. Facebook Ireland Ltd. uses this data for market research and advertising purposes as well as for the
                            creation of user profiles. Based on these profiles, Facebook Ireland Ltd. can provide advertising both within and outside of Facebook based on your interests. If you are logged into Facebook at the time you
                            access our site, Facebook Ireland Ltd. will also link this data to your user account.
                        </p>
                        <p>
                            If you contact us via Facebook, the personal data you provide at that time will be used to process the request. We will delete this data once we have completely responded to your query, unless there are legal
                            obligations to retain the data, such as for subsequent fulfillment of contracts.
                        </p>
                        <p>Facebook Ireland Ltd. might also set cookies when processing your data.</p>
                        <p>
                            If you do not agree to this processing, you have the option of preventing the installation of cookies by making the appropriate settings in your browser. Cookies that have already been saved can be deleted at any
                            time. The instructions to do this depend on the browser and system being used. For Flash cookies, the processing cannot be prevented by the settings in your browser, but instead by making the appropriate settings
                            in your Flash player. If you prevent or restrict the installation of cookies, not all of the functions of Facebook may be fully usable.
                        </p>
                        <p>Details on the processing activities, their suppression, and the deletion of the data processed by Facebook can be found in its privacy policy:</p>
                        <Link href="https://www.facebook.com/privacy/explanation" className="underline">
                            https://www.facebook.com/privacy/explanation
                        </Link>
                        <p>It cannot be excluded that the processing by Facebook Ireland Ltd. will also take place in the United States by Meta Platforms, Inc., 1601 Willow Road, Menlo Park, California 94025.</p>
                        <h6>Instagram</h6>
                        <p>To advertise our products and services as well as to communicate with interested parties or customers, we have a presence on the Instagram platform.</p>
                        <p>On this social media platform, we are jointly responsible with Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Ireland.</p>
                        <p>The data protection officer of Instagram can be reached via this contact form:</p>
                        <Link href="https://www.facebook.com/help/contact/5409779486302970" className="underline">
                            https://www.facebook.com/help/contact/5409779486302970
                        </Link>
                        <p>
                            We have defined the joint responsibility in an agreement regarding the respective obligations within the meaning of the GDPR. This agreement, which sets out the reciprocal obligations, is available at the
                            following link:
                        </p>
                        <Link href="https://www.facebook.com/legal/terms/page_controller_addendum" className="underline">
                            https://www.facebook.com/legal/terms/page_controller_addendum
                        </Link>
                        <p>
                            The legal basis for the processing of the resulting and subsequently disclosed personal data is Art. 6 para. 1 lit. f GDPR. Our legitimate interest lies in the analysis, communication, sales, and promotion of our
                            products and services.
                        </p>
                        <p>
                            The legal basis may also be your consent per Art. 6 para. 1 lit. a GDPR. If lit. a GDPR granted to the platform operator. Per Art. 7 para. 3 GDPR, you may revoke this consent with the platform operator at any
                            time with future effect.
                        </p>
                        <p>When accessing our online presence on the Instagram platform, Facebook Ireland Ltd. as the operator of the platform in the EU will process your data (e.g. personal information, IP address, etc.).</p>
                        <p>
                            This data of the user is used for statistical information on the use of our company presence on Instagram. Facebook Ireland Ltd. uses this data for market research and advertising purposes as well as for the
                            creation of user profiles. Based on these profiles, Facebook Ireland Ltd. can provide advertising both within and outside of Instagram based on your interests. If you are logged into Instagram at the time you
                            access our site, Facebook Ireland Ltd. will also link this data to your user account.
                        </p>
                        <p>
                            If you contact us via Instagram, the personal data you provide at that time will be used to process the request. We will delete this data once we have completely responded to your query, unless there are legal
                            obligations to retain the data, such as for subsequent fulfillment of contracts.
                        </p>
                        <p>Facebook Ireland Ltd. might also set cookies when processing your data.</p>
                        <p>
                            If you do not agree to this processing, you have the option of preventing the installation of cookies by making the appropriate settings in your browser. Cookies that have already been saved can be deleted at any
                            time. The instructions to do this depend on the browser and system being used. For Flash cookies, the processing cannot be prevented by the settings in your browser, but instead by making the appropriate settings
                            in your Flash player. If you prevent or restrict the installation of cookies, not all of the functions of Instagram may be fully usable.
                        </p>
                        <p>Details on the processing activities, their suppression, and the deletion of the data processed by Instagram can be found in its privacy policy:</p>
                        <Link href="https://help.instagram.com/519521250107875" className="underline">
                            https://help.instagram.com/519521250107875
                        </Link>
                        <p>It cannot be excluded that the processing by Facebook Ireland Ltd. will also take place in the United States by Meta Platforms, Inc., 1601 Willow Road, Menlo Park, California 94025.</p>
                        <Link href="https://www.xn--generator-datenschutzerklrung-pqc.de/">Model Data Protection Statement for Anwaltskanzlei Weiß & Partner</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
}
