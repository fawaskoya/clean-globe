import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MainContent from "@/components/layout/MainContent";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";
import { ReCaptchaProvider } from "@/components/providers/ReCaptchaProvider";
import { WhatsAppCTA } from "@/components/features/WhatsAppCTA";

// Proxies for Oak Sans and Astoria
const oak = Inter({
  subsets: ["latin"],
  variable: "--font-oak",
  display: "swap",
});

const astoria = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-astoria",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${COMPANY_INFO.name}`,
    default: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
  },
  description: "CGC is your sustainability partner, providing expert ESG, energy, and net-zero advisory services in Qatar.",
  metadataBase: new URL("https://www.thecleanglobe.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <html lang="en" className={cn("scroll-smooth", oak.variable, astoria.variable)}>
      <body className="font-serif antialiased bg-cream text-forest flex flex-col min-h-screen">
        <ReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
          <WhatsAppCTA />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
