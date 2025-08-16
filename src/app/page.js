import HomeClient from "./HomeClient";
import apiClient from "@/app/lib/api/apiClients";

export const metadata = {
  title: "Stock Market Tracker | Real-time NSE/BSE Data | Trade Brains",
  description: "Track Indian stocks with real-time NSE/BSE prices, interactive charts, and insights.",
  openGraph: {
    title: "Stock Market Tracker | Real-time NSE/BSE Data | Trade Brains",
    description: "Track Indian stocks with live data and insights.",
    url: "https://portal.tradebrains.in",
    siteName: "Trade Brains",
    images: [
      {
        url: "https://portal.tradebrains.in/banner/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Trade Brains Stock Market Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function Home() {
  try {
    const data = await apiClient.get("/api/assignment/index/NIFTY/movers/");
    return <HomeClient initialData={data} />;
  } catch (error) {
    console.error("Error fetching stock movers:", error);
    return <HomeClient initialData={null} />;
  }
}
