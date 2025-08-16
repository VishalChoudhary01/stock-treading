import { notFound } from 'next/navigation';
import apiClient from '@/app/lib/api/apiClients';
import StockDetailClient from './StockDetailClient';

export async function generateMetadata({ params }) {
  const { symbol } = params;
  try {
    const priceData = await apiClient.get(`/api/assignment/stock/${symbol}/prices`, {
      params: { days: 1, type: "INTRADAY" }
    });

    if (!priceData || priceData.length === 0) return defaultMetadata(symbol);

    const firstClose = priceData[0].prev_close;
    const latest = priceData[priceData.length - 1].close;
    const change = latest - firstClose;
    const changePercent = ((change / firstClose) * 100).toFixed(2);
    const isUp = change >= 0;

    return {
      title: `${symbol} Stock - ₹${latest.toFixed(2)} (${isUp ? '+' : ''}${changePercent}%) | Tred Brains`,
      description: `Track ${symbol} stock performance with real-time prices and charts.`,
      openGraph: {
        title: `${symbol} Stock Price | Tred Brains`,
        description: `Live ${symbol} stock updates, technical analysis and charts.`,
        url: `https://portal.tradebrains.in/stock/${symbol}`,
        images: [
          {
            url: `/api/og?symbol=${symbol}&price=${latest.toFixed(2)}&change=${changePercent}`,
            width: 1200,
            height: 630,
            alt: `${symbol} Stock Chart`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${symbol} Stock - ₹${latest.toFixed(2)} | Tred Brains`,
        description: `Track ${symbol} stock performance in real-time`,
        images: [`/api/og?symbol=${symbol}&price=${latest.toFixed(2)}&change=${changePercent}`],
      },
    };
  } catch {
    return defaultMetadata(symbol);
  }
}

function defaultMetadata(symbol) {
  return {
    title: `${symbol} Stock Details | Tred Brains`,
    description: `View ${symbol} stock details, price history, and technical analysis`
  };
}

export default async function Page({ params }) {
  const { symbol } = params;
  try {
    const priceData = await apiClient.get(`/api/assignment/stock/${symbol}/prices`, {
      params: { days: 1, type: "INTRADAY" }
    });

    if (!priceData || priceData.length === 0) {
      return notFound();
    }

    return <StockDetailClient initialData={priceData} symbol={symbol} />;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return notFound();
  }
}
