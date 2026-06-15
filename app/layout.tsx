import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://armaanmirpuri.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Armaan Mirpuri | Portfolio",
    template: "%s | Armaan Mirpuri"
  },
  description:
    "Personal site for Armaan Mirpuri, a UT Knoxville Business Analytics student with experience in operations, sales analysis, financial markets, and trading.",
  keywords: [
    "Armaan Mirpuri",
    "portfolio",
    "business analytics",
    "data analytics",
    "financial markets",
    "futures trading",
    "risk management",
    "operations"
  ],
  authors: [{ name: "Armaan Mirpuri" }],
  openGraph: {
    title: "Armaan Mirpuri | Portfolio",
    description:
      "Business analytics, operations experience, trading interests, resume, and contact information for Armaan Mirpuri.",
    url: siteUrl,
    siteName: "Armaan Mirpuri",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Armaan Mirpuri | Portfolio",
    description:
      "Business analytics, operations experience, trading interests, resume, and contact information for Armaan Mirpuri."
  },
  alternates: {
    canonical: siteUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
