"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {FaArrowUp,FaArrowDown,FaBookmark,FaRegBookmark,} from "react-icons/fa";

export default function StockList({ gainers, losers }) {
  const router = useRouter();
  const [savedStocks, setSavedStocks] = useState({});

  // Load saved stocks from localStorage on initial render
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedStocks")) || {};
    setSavedStocks(saved);
  }, []);

  // Format number with commas
  const formatNumber = (num) => {
    if (!num) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Toggle bookmark state
  const toggleBookmark = (stock, e) => {
    e.stopPropagation();
    const newSavedStocks = { ...savedStocks };

    
    if (newSavedStocks[stock.id]) {
      delete newSavedStocks[stock.id];
    } else {
      newSavedStocks[stock.id] = stock;
    }

    localStorage.setItem("savedStocks", JSON.stringify(newSavedStocks));
    setSavedStocks(newSavedStocks);
  };

  const StockItem = ({ stock, isGainer }) => (
    <div
      onClick={() => router.push(`/stock/${stock.symbol}`)}
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-5 
        ${isGainer ? "hover:bg-gainerHoverBg" : "hover:bg-loserHoverBg"} 
        ${isGainer ? "dark:hover:bg-gainerDarkHoverBg" : "dark:hover:bg-loserDarkHoverBg"}
        cursor-pointer transition-all duration-200 relative group`}
    >
      {/* Bookmark */}
      <button
        onClick={(e) => toggleBookmark(stock, e)}
        className="absolute md:top-3 top-5 left-3 sm:static sm:mr-3 cursor-pointer  transition-colors"
        aria-label={savedStocks[stock.id] ? "Remove bookmark" : "Add bookmark"}
      >
        {savedStocks[stock.id] ? (
          <FaBookmark className="text-sm sm:text-base md:text-lg text-bookmarkIcontext dark:text-bookmarkIconDarktext" />
        ) : (
          <FaRegBookmark className="text-sm sm:text-base md:text-lg group-hover:text-bookmarkIconHover dark:group-hover:text-bookmarkIconDarkHover" />
        )}
      </button>

      {/* Stock Info */}
      <div className="pl-8 sm:pl-0 flex-1">
        <div className="flex flex-row items-center gap-x-3 ">
          <span className="font-bold text-textColor dark:text-textDarkColor text-sm sm:text-base md:text-lg truncate">
            {stock.symbol}
          </span>
          <span
            className={`mt-1 sm:mt-0 sm:ml-3 px-2 py-0.5  rounded-full truncate max-w-[100px] sm:max-w-none
              text-[12px] sm:text-xs 
              ${isGainer
                ? "bg-gainBadgeBg dark:bg-gainDarkBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
                : "bg-lossBadgeBg dark:bg-lossDarkBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {stock.comp_name}
          </span>
        </div>
      </div>

      {/* Price & Change */}
      <div className="mt-2  sm:mt-0 text-right min-w-[90px]">
        <div
          className={`font-semibold text-sm sm:text-base md:text-lg 
            ${isGainer
              ? "text-gainText dark:text-gainDarkText"
              : "text-lossText dark:text-lossDarkText"
            }`}
        >
          ₹{stock.close?.toFixed(2) || "N/A"}
        </div>
        <div className="flex justify-end gap-1   sm:gap-2 mt-1">
          <span
            className={`px-1.5 py-0.5 rounded text-[12px] sm:text-xs md:text-sm 
              ${isGainer
                ? "bg-gainBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
                : "bg-lossBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {isGainer ? "+" : ""}
            {stock.change?.toFixed(2) || "0.00"}
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[12px] sm:text-xs md:text-sm
              ${isGainer
                ? "bg-gainBadgeBg text-gainBadgeText dark:text-gainBadgedarkText"
                : "bg-lossBadgeBg text-lossBadgeText dark:text-lossBadgeDarkText"
              }`}
          >
            {isGainer ? "+" : ""}
            {stock.percent?.toFixed(2) || "0.00"}%
          </span>
        </div>
        <div className="text-[12px] sm:text-xs text-paragraph dark:text-paragraphDark mt-1">
          VOL: {formatNumber(stock.volume)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-glassBg dark:bg-glassDarkBg rounded-xl shadow-lg overflow-hidden">
      {/* Gainers */}
      <div className="mb-6 md:mb-10">
        <div className="bg-gradient-to-r from-gainerHeaderFrom to-gainerHeaderTo dark:from-gainerHeaderDarkFrom dark:to-gainerHeaderDarkTo p-3 md:p-5 border-b border-gainerHeaderBorder dark:border-gainerHeaderDarkBorder">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gainText dark:text-gainDarkText flex items-center">
            <span className="bg-gainText text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3">
              <FaArrowUp className="text-[10px] sm:text-xs md:text-sm" />
            </span>
            Top Gainers
            <span className="text-gainText ml-1 md:ml-2 text-xs sm:text-sm md:text-base font-normal">
              ({gainers?.length || 0})
            </span>
          </h2>
        </div>
        <div className="divide-y divide-glassBorder dark:divide-glassDarkBorder">
          {gainers?.map((stock) => (
            <StockItem key={stock.id} stock={stock} isGainer />
          ))}
        </div>
      </div>

      {/* Losers */}
      <div>
        <div className="bg-gradient-to-r from-loserHeaderFrom to-loserHeaderTo dark:from-loserHeaderDarkFrom dark:to-loserHeaderDarkTo p-3 md:p-5 border-b border-loserHeaderBorder dark:border-loserHeaderDarkBorder">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-lossText dark:text-lossDarkText flex items-center">
            <span className="bg-lossText text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center mr-2 md:mr-3">
              <FaArrowDown className="text-[10px] sm:text-xs md:text-sm" />
            </span>
            Top Losers
            <span className="text-lossText ml-1 md:ml-2 text-xs sm:text-sm md:text-base font-normal">
              ({losers?.length || 0})
            </span>
          </h2>
        </div>
        <div className="divide-y divide-glassBorder dark:divide-glassDarkBorder">
          {losers?.map((stock) => (
            <StockItem key={stock.id} stock={stock} isGainer={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
