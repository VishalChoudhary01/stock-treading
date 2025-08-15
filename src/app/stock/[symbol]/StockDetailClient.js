"use client";
import React, { useEffect, useState, useRef } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StockChart from "@/app/components/organism/StockChart";
import Loader from "@/app/components/templates/loaders/loader";
import ErrorComponent from "@/app/components/templates/Error";
import apiClient from "@/app/lib/api/apiClients";
import { useParams } from "next/navigation";
import Head from "next/head";

export default function StockDetailClient({ initialData }) {
  const params = useParams();
  const symbol = params.symbol;
   const stockName = initialData?.stockName || symbol;

  const [priceData, setPriceData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState(1);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const fetchPriceData = async () => {
      setLoading(true);
      try {
        const data = await apiClient.get(
          `/api/assignment/stock/${symbol}/prices`,
          {
            params: {
              days: timePeriod,
              type: timePeriod === 1 ? "INTRADAY" : "DAILY",
            },
          }
        );
        setPriceData(data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setError("Stock data not available");
      } finally {
        setLoading(false);
      }
    };

    fetchPriceData();
  }, [timePeriod, symbol]);

  if (!priceData || priceData.length === 0) return null;
  
  const firstClose = priceData[0].prev_close;
  const latest = priceData[priceData.length - 1].close;
  const change = latest - firstClose;
  const changePercent = ((change / firstClose) * 100).toFixed(2);
  const isUp = change >= 0;

  return (
    <>
      <Head>
        <title>{`${stockName} (${symbol}) - Stock Details | Tred Brains`}</title>
        <meta 
          name="description" 
          content={`Track real-time ${stockName} (${symbol}) stock prices, charts, technical analysis and trading signals. Current price ₹${latest.toFixed(2)} (${isUp ? '+' : ''}${changePercent}%).`} 
        />
        <meta 
          name="keywords" 
          content={`${stockName}, ${symbol}, stock price, share market, trading, NSE, BSE, stock chart, technical analysis, ${stockName} share price, ${symbol} stock, stock forecast, equity`} 
        />
        <meta property="og:title" content={`${stockName} (${symbol}) - Real-time Stock Analysis`} />
        <meta property="og:description" content={`Track ${stockName} stock performance with live charts and technical indicators. Current price: ₹${latest.toFixed(2)} (${isUp ? '+' : ''}${changePercent}%)`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourdomain.com/stock/${symbol}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${stockName} (${symbol}) Stock Price`} />
        <meta name="twitter:description" content={`Real-time ${stockName} stock performance with technical analysis. Current price: ₹${latest.toFixed(2)}`} />
      </Head>

      <div className="md:max-w-7xl md:mt-10 mx-auto px-3 sm:px-4 py-16 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{symbol}</h1>
            <div className="flex items-center mt-1 sm:mt-3">
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="bg-glassBg dark:bg-glassDarkBg border border-glassBorder dark:border-glassDarkBorder rounded p-1.5 sm:p-2 text-xs sm:text-sm"
              >
                <option value={1}>1 Day</option>
                <option value={7}>1 Week</option>
                <option value={30}>1 Month</option>
                <option value={90}>3 Months</option>
                <option value={180}>6 Months</option>
                <option value={365}>1 Year</option>
              </select>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-semibold ${isUp ? "text-green-500" : "text-red-500"}`}>
            {isUp ? <FaArrowUp /> : <FaArrowDown />}
            ₹{latest.toFixed(2)} ({changePercent}%)
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[
            { label: "Open", value: priceData[0].open.toFixed(2) },
            { label: "High", value: Math.max(...priceData.map(p => p.high)).toFixed(2) },
            { label: "Low", value: Math.min(...priceData.map(p => p.low)).toFixed(2) },
            { label: "Volume", value: priceData.reduce((sum, p) => sum + p.volume, 0).toLocaleString() }
          ].map((stat, index) => (
            <div key={index} className="bg-glassBg dark:bg-glassDarkBg p-3 sm:p-4 rounded-lg shadow">
              <p className="text-xs sm:text-sm">{stat.label}</p>
              <p className="text-lg sm:text-xl font-semibold">
                {stat.label === "Volume" ? stat.value : `₹${stat.value}`}
              </p>
            </div>
          ))}
        </div>

        {/* Chart with Loading State */}
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader />
          </div>
        ) : error ? (
          <ErrorComponent />
        ) : (
          <StockChart symbol={symbol} priceData={priceData} timePeriod={timePeriod} />
        )}
      </div>
    </>
  );
}