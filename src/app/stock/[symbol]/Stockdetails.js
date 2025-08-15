import StockDetails from "./page";

export async function generateMetadata({ params }) {
  const { symbol } = params;
  return {
    title: `${symbol} - Stock Details`,
    description: `View ${symbol} stock chart and price change`,
    openGraph: {
      title: `${symbol} Stock Price & Chart`,
      description: `Get the latest ${symbol} stock price, historical data, and interactive charts.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${symbol} Stock Price & Chart`,
      description: `Track ${symbol} stock performance and market movements.`,
    },
  };
}

export default function Page({ params }) {
  return <StockDetails symbol={params.symbol} />;
}
