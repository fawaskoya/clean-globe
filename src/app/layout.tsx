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
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ANNOUNCE_HEIGHT } from "@/lib/training";
import { getPublishedCourses, getAnnouncement } from "@/lib/training-data";

// Static pages re-fetch the Training menu / ticker at most once a minute.
export const revalidate = 60;

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

const SITE_URL = "https://www.thecleanglobe.com";
const DEFAULT_DESCRIPTION =
  "CGC is your sustainability partner, providing expert ESG, energy, and net-zero advisory services in Qatar.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${COMPANY_INFO.name}`,
    default: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: COMPANY_INFO.name,
  keywords: [
    "ESG advisory Qatar",
    "sustainability consultancy Doha",
    "net zero advisory",
    "energy audit Qatar",
    "GSAS LEED WELL",
    "TCFD reporting",
    "climate change advisory",
  ],
  authors: [{ name: COMPANY_INFO.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/logo.png", width: 1080, height: 1080, alt: COMPANY_INFO.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY_INFO.name,
  alternateName: COMPANY_INFO.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  email: COMPANY_INFO.email,
  telephone: COMPANY_INFO.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Office 219, Business & Innovation Park, Building 1, Street 504, Zone 49",
    addressLocality: "Ras Bufontas Free Zone",
    addressRegion: "Doha",
    addressCountry: "QA",
  },
  areaServed: ["Qatar", "GCC", "Global"],
  sameAs: [],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const [courses, announcement] = await Promise.all([getPublishedCourses(), getAnnouncement()]);
  const trainingCourses = courses.map((c) => ({ title: c.title, slug: c.slug }));

  return (
    <html
      lang="en"
      className={cn("scroll-smooth", oak.variable, astoria.variable)}
      style={{ ["--announce-h" as string]: announcement ? ANNOUNCE_HEIGHT : "0px" } as React.CSSProperties}
    >
      <body className="font-serif antialiased bg-cream text-forest flex flex-col min-h-screen">
        <ReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
          {announcement && <AnnouncementBar text={announcement.text} link={announcement.link} />}
          <Header trainingCourses={trainingCourses} />
          <MainContent>{children}</MainContent>
          <Footer />
          <WhatsAppCTA />
        </ReCaptchaProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </body>
    </html>
  );
}
