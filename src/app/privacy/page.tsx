

import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
    title: "Privacy Policy",
};

export default function PrivacyPage() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="January 2026">
            <p>
                At Clean Globe Consultancy (CGC), we respect your privacy and are committed to protecting your personal data. This privacy policy informs you how we look after your personal data when you visit our website and regarding your privacy rights.
            </p>
            <h3>1. Important information and who we are</h3>
            <p>
                CGC is the controller and responsible for your personal data. If you have any questions about this privacy policy, please contact us using the form on our <a href="/contact">Contact page</a>.
            </p>
            <h3>2. The data we collect about you</h3>
            <p>
                We may collect, use, store and transfer different kinds of personal data about you including: Identity Data (name), Contact Data (email, phone), and Technical Data (IP address, browser type).
            </p>
            <h3>3. How we use your personal data</h3>
            <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data where we need to perform the services requested or where it is necessary for our legitimate interests.
            </p>
        </LegalPageLayout>
    );
}
