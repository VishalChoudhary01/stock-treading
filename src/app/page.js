import HomeClient from './HomeClient';
import apiClient from "@/app/lib/api/apiClients";
import Head from 'next/head';

export const metadata = {
  title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
  description: "Track Indian stocks with real-time NSE/BSE prices, interactive charts, technical indicators, and market insights. Monitor NIFTY, SENSEX, and top gainers/losers.",
  keywords: [
    "stock market india",
    "nse live prices",
    "bse share market",
    "nifty 50",
    "sensex today",
    "stock tracker",
    "technical analysis",
    "stock screener",
    "top gainers",
    "top losers",
    "portfolio tracker",
    "equity research",
    "market trends",
    "stock signals",
    "Tred Brains"
  ],
  openGraph: {
    title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
    description: "Track Indian stocks with real-time NSE/BSE prices, interactive charts, technical indicators, and market insights.",
    url: "https://portal.tradebrains.in",
    siteName: "Tred Brains",
    images: [
      {
        url: "https://portal.tradebrains.in/banner/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Tred Brains Stock Market Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
    description: "Track Indian stocks with real-time prices, charts, and market insights on Tred Brains",
    images: ["https://portal.tradebrains.in/banner/banner.jpg"],
    site: "@TradeBrains",
    creator: "@TradeBrains"
  },
  authors: [
    { name: "Trade Brains", url: "https://tradebrains.in" }
  ],
  creator: "Vishal Kumar Choudhary",
  publisher: "Trade Brains",
  robots: "index, follow",
  alternates: {
    canonical: "https://portal.tradebrains.in"
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  }
};

export default async function Home() {
  try {
    const data = await apiClient.get("/api/assignment/index/NIFTY/movers/");
    return<>
    <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords.join(', ')} />
          
          {/* Open Graph */}
          <meta property="og:title" content={metadata.openGraph.title} />
          <meta property="og:description" content={metadata.openGraph.description} />
          <meta property="og:url" content={metadata.openGraph.url} />
          <meta property="og:site_name" content={metadata.openGraph.siteName} />
          <meta property="og:image" content={metadata.openGraph.images[0].url} />
          <meta property="og:image:width" content={metadata.openGraph.images[0].width} />
          <meta property="og:image:height" content={metadata.openGraph.images[0].height} />
          <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
          <meta property="og:locale" content={metadata.openGraph.locale} />
          <meta property="og:type" content={metadata.openGraph.type} />
          
          {/* Twitter */}
          <meta name="twitter:card" content={metadata.twitter.card} />
          <meta name="twitter:title" content={metadata.twitter.title} />
          <meta name="twitter:description" content={metadata.twitter.description} />
          <meta name="twitter:image" content={metadata.twitter.images[0]} />
          <meta name="twitter:site" content={metadata.twitter.site} />
          <meta name="twitter:creator" content={metadata.twitter.creator} />
          
          {/* Authorship */}
          <meta name="author" content={metadata.authors.map(a => a.name).join(', ')} />
          <meta name="creator" content={metadata.creator} />
          <meta name="publisher" content={metadata.publisher} />
          
          {/* SEO Directives */}
          <meta name="robots" content={metadata.robots} />
          <link rel="canonical" href={metadata.alternates.canonical} />
          
          {/* Verification */}
          <meta name="google-site-verification" content={metadata.verification.google} />
          <meta name="yandex-verification" content={metadata.verification.yandex} />
          
          {/* Viewport for responsiveness */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          
          {/* Theme Color */}
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          
          {/* PWA Configuration */}
          <link rel="manifest" href="/manifest.json" />
        </Head>

    <HomeClient initialData={data} />;
    </> 
  } catch (error) {
    console.error("Error fetching stock movers:", error);
    return <HomeClient initialData={null} />;
  }
}