

import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
    title: "Terms of Service",
};

export default function TermsPage() {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="January 2026">
            <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Clean Globe Consultancy website operated by CGC.
            </p>
            <h3>1. Conditions of Use</h3>
            <p>
                We provide services to you subject to the conditions stated below. Every time you visit this website or use its services, you accept the following conditions.
            </p>
            <h3>2. Privacy Policy</h3>
            <p>
                Before you continue using our website we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.
            </p>
            <h3>3. Copyright</h3>
            <p>
                Content published on this website (digital downloads, images, texts, graphics, logos) is the property of CGC and/or its content creators and protected by international copyright laws.
            </p>
        </LegalPageLayout>
    );
}
