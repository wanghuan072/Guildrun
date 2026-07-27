import Script from "next/script";
import AppHeader from "@/src/components/AppHeader";
import AppFooter from "@/src/components/AppFooter";
import JsonLd from "@/src/components/JsonLd";
import { siteConfig } from "@/src/seo/siteConfig";
import "@/src/styles/globals.css";
import "@/src/styles/header.css";
import "@/src/styles/footer.css";
import "@/src/styles/directory.css";
import "@/src/styles/detail.css";
import "@/src/styles/archive.css";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.siteName,
  category: "games",
  icons: {
    icon: [
      {
        url: "/images/ico.ico",
        type: "image/x-icon",
        sizes: "32x32",
      },
    ],
    shortcut: "/images/ico.ico",
    apple: [
      {
        url: "/images/ico.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.siteName,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.defaultImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07111b",
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.defaultDescription,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.siteUrl}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaMeasurementId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.gaMeasurementId}');
          `}
        </Script>
        <JsonLd data={websiteSchema} />
        <AppHeader />
        <div id="site-content" tabIndex="-1">
          {children}
        </div>
        <AppFooter />
      </body>
    </html>
  );
}
