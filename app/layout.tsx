import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono-stack",
  subsets: ["latin"],
  display: "swap",
});

const sans = Geist({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Systems and applied AI engineer. Payments infrastructure at JPMorgan Chase, edge inference at the NSF ICICLE AI Institute, agent infrastructure at MultAI, and Linux kernel work on io_uring. Three-time founder. CS @ Ohio State. Seeking early-stage startup roles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uzairbeg.com"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Uzair Beg",
    "backend engineer",
    "systems engineer",
    "applied AI",
    "startup engineer",
    "founding engineer",
    "Linux kernel",
    "distributed systems",
    "payments infrastructure",
    "AI agents",
    "Ohio State",
  ],
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.role}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

/** Structured data so search + LLM crawlers get the facts right rather than inferring them. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description,
  url: "https://www.uzairbeg.com",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "San Francisco", addressRegion: "CA" },
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Ohio State University" }],
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.variable} ${sans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-term focus:bg-bg focus:px-4 focus:py-2 focus:text-sm focus:text-term"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
