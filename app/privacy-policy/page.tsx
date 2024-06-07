import privacy from "@/public/images/privacy.png";

export default function PrivacyPolicy() {
    return (
        <div>
            <img src={privacy.src} className="ml-[500px]" alt="Privacy Policy"/>
            <h1 className="ml-[586px] font-bold text-5xl mt-20">Privacy Policy</h1>
            <p className="ml-44 mt-10">
                At [Website Name], we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information you provide when using our PDF converter website.
            </p>
            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl text-muted-foreground ml-44">1. Information We Collect</h2>
                <p className="ml-44">
                    We collect and use limited information to improve the user experience. The only data we collect is
                    through Google Analytics, which includes: Usage Information: We may collect information about your
                    interaction with our website, such as the pages you visit, your IP address, browser type, device
                    type, and referral URLs. This information helps us understand how users interact with our website to
                    enhance its functionality and content.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl ml-44 text-muted-foreground">2. Use of Information</h2>
                <p className="ml-44">
                    We use the information collected through Google Analytics solely for the purpose of understanding
                    user behavior and improving our website's performance. We do not sell, rent, or share this
                    information with third parties.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl ml-44 text-muted-foreground">3. Data Security</h2>
                <p className="ml-44">
                    We take reasonable measures to protect your data against unauthorized access, disclosure,
                    alteration, or destruction. However, please be aware that no method of data transmission over the
                    internet or electronic storage is 100% secure.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl ml-44 text-muted-foreground">4. Disclosure of Information</h2>
                <p className="ml-44">
                    We may share your personal information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                    We may also disclose your information when we believe it is necessary to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-xl md:text-2xl ml-44 text-muted-foreground">5. Cookies and Tracking Technologies</h2>
                <p className="ml-44">
                    We use cookies and similar tracking technologies to collect and store information about your
                    interactions with our website. You can control cookie preferences through your browser settings.
                    Please note that disabling cookies may affect your experience on our website.
                </p>
            </div>
        </div>
    );
}
