"use client";
import React, { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import apiClient from "@/app/lib/api/apiClients";
import Head from "next/head";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StockChart from "@/app/components/organism/StockChart";
import Loader from "@/app/components/templates/loaders/loader";
import Error from "@/app/components/templates/Error";

export default function Page() {
  const { symbol } = useParams();
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timePeriod, setTimePeriod] = useState(1);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const data = await apiClient.get(`/api/assignment/stock/${symbol}/prices`, {
          params: {
            days: timePeriod,
            type: timePeriod === 1 ? "INTRADAY" : "DAILY",
          },
        });
        setPriceData(data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching price data:", error);
        setError("Stock data not available");
        setPriceData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPriceData();
  }, [symbol, timePeriod]);

  if (loading) return <Loader />;
  if (!priceData.length) return notFound();
  if (error) return <Error />;

  const firstClose = priceData[0].prev_close;
  const latest = priceData[priceData.length - 1].close;
  const change = latest - firstClose;
  const changePercent = ((change / firstClose) * 100).toFixed(2);
  const isUp = change >= 0;

  return (
    <>
      <Head>
        <title>{symbol} - Stock Details</title>
        <meta name="description" content={`View ${symbol} stock chart and price change`} />
      </Head>

      <div className="md:max-w-7xl md:mt-10 mx-auto px-3 sm:px-4 py-16 sm:py-10 text-textColor dark:text-textDarkColor">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-robotoMono tracking-wider text-shadow-md text-shadow-neutral-50/50 break-words">
              {symbol}
            </h1>
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

          <div
            className={`flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-semibold ${
              isUp ? "text-gainText dark:text-gainDarkText" : "text-lossText dark:text-lossDarkText"
            }`}
          >
            {isUp ? <FaArrowUp /> : <FaArrowDown />}
            ₹{latest.toFixed(2)} ({changePercent}%)
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-glassBg dark:bg-glassDarkBg p-3 sm:p-4 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-paragraph dark:text-paragraphDark">Open</p>
            <p className="text-lg sm:text-xl font-semibold">
              ₹{priceData[0].open.toFixed(2)}
            </p>
          </div>
          <div className="bg-glassBg dark:bg-glassDarkBg p-3 sm:p-4 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-paragraph dark:text-paragraphDark">High</p>
            <p className="text-lg sm:text-xl font-semibold">
              ₹{Math.max(...priceData.map((p) => p.high)).toFixed(2)}
            </p>
          </div>
          <div className="bg-glassBg dark:bg-glassDarkBg p-3 sm:p-4 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-paragraph dark:text-paragraphDark">Low</p>
            <p className="text-lg sm:text-xl font-semibold">
              ₹{Math.min(...priceData.map((p) => p.low)).toFixed(2)}
            </p>
          </div>
          <div className="bg-glassBg dark:bg-glassDarkBg p-3 sm:p-4 rounded-lg shadow">
            <p className="text-xs sm:text-sm text-paragraph dark:text-paragraphDark">Volume</p>
            <p className="text-lg sm:text-xl font-semibold">
              {priceData.reduce((sum, p) => sum + p.volume, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart */}
        <StockChart symbol={symbol} priceData={priceData} timePeriod={timePeriod} />
      </div>
    </>
  );
}
