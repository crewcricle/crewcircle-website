import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = GeistSans;

export const metadata: Metadata = {
  metadataBase: new URL("https://crewcircle.com.au"),
  alternates: {
    canonical: "https://crewcircle.com.au",
  },
  title: "CrewCircle | AI Consultancy by Prabhat Ranjan",
  description:
      "AI solutions that sort your small biz, no dramas. Practical AI tools and strategy for Australian businesses, by Prabhat Ranjan (Canva, JPMorgan, MSCI, BNP Paribas).",
  openGraph: {
    title: "CrewCircle | AI Consultancy by Prabhat Ranjan",
    description:
      "AI solutions that sort your small biz, no dramas. Practical AI tools and strategy for Australian businesses, by Prabhat Ranjan (ex-Canva, JPMorgan, MSCI).",
    url: "https://crewcircle.com.au",
    siteName: "CrewCircle",
    images: [{
      url: "https://crewcircle.com.au/social/social-preview-1200x630.png",
      width: 1200,
      height: 630,
      alt: "CrewCircle - AI Consultancy for Australian Businesses",
    }],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@crewcircle",
    creator: "@prabhatranjann",
    title: "CrewCircle",
    description:
      "AI solutions that sort your small biz, no dramas. Practical AI tools and strategy for Australian businesses.",
    images: ["https://crewcircle.com.au/social/social-preview-1200x630.png"],
  },
  other: {
    "linkedin:owner": "linkedin.com/company/crewcircle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
          <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
