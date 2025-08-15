import HomeClient from './page';

export const metadata = {
  title: "Stock Tracker | Real-time Market Data",
  description: "Track your favorite stocks with real-time price data, charts, and market updates.",
  keywords: ["stocks", "stock market", "NIFTY", "stock prices", "live charts"],
  openGraph: {
    title: "Stock Tracker | Real-time Market Data",
    description: "Track your favorite stocks with real-time price data, charts, and market updates.",
    url: "https://yourdomain.com",
    siteName: "Stock Tracker",
    images: [
      {
        url: "/banner/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Stock market dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Tracker | Real-time Market Data",
    description: "Track your favorite stocks with real-time price data, charts, and market updates.",
    images: ["/banner/banner.jpg"],
  },
};

export default function Home() {
  return <HomeClient />;
}