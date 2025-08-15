"use client";
import React, { useState, useEffect } from "react";
import StockList from "@/app/components/moleclues/stockList";
import Loader from "@/app/components/templates/loaders/loader";

export default function SavedStocksPage() {
  const [savedStocks, setSavedStocks] = useState({ gainers: [], losers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedStocks")) || {};
    const stocks = Object.values(saved);

    const gainers = stocks.filter((stock) => stock.percent > 0);
    const losers = stocks.filter((stock) => stock.percent <= 0);

    setSavedStocks({ gainers, losers });
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-linear-180 from-[#f1fafc] to-[#b1e2f5d2] dark:bg-linear-180 dark:from-[#09090a] dark:to-[#00050c]">
      <div className="max-w-full sm:max-w-3xl md:max-w-7xl mx-auto px-3 sm:px-4 py-20 md:py-28 sm:py-10 ">
        
        {/* Page Heading */}
        <div className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            Saved Stocks
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Your bookmarked stocks
          </p>
        </div>

        {savedStocks.gainers.length === 0 && savedStocks.losers.length === 0 ? (
          <div className="bg-glassBg dark:bg-glassDarkBg rounded-xl shadow-lg p-6 sm:p-10 text-center">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              No saved stocks yet
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Bookmark stocks by clicking the bookmark icon on stock listings
            </p>
          </div>
        ) : (
          <StockList
            gainers={savedStocks.gainers}
            losers={savedStocks.losers}
          />
        )}
      </div>
    </div>
  );
}
