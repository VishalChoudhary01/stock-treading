import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function TickerBar({ stocks }) {
  if (!stocks || !stocks.length) return null;

  return (
    <div className="bg-glassBg fixed z-10 md:top-16 top-12 dark:bg-glassDarkBg backdrop-blur-3xl border-b border-glassBorder dark:border-glassDarkBorder overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stocks, ...stocks].map((stock, idx) => {
          const isUp = stock.close > stock.open;
          const percentChange = ((stock.close - stock.open) / stock.open) * 100;

          return (
            <div
              key={`${stock.id}-${idx}`}
              className="flex items-center md:gap-5 gap-x-2.5 px-6 py-2"
            >
              <span className="font-semibold text-gray-900 dark:text-white font-robotoMono md:text-[0.8rem] text-[0.85rem]">
                {stock.symbol || stock.company_id}
              </span>
              <span
                className={`flex items-center gap-1 md:text-[1.05rem] text-[0.7rem] font-medium ${
                  isUp ? "dark:text-gainDarkText text-gainText" : "text-lossText dark:text-lossDarkText"
                }`}
              >
              <span >{isUp ? <FaArrowUp /> : <FaArrowDown />}</span>  
               <span className="font-poppins md:text-[1.05rem] text-[0.7rem]">{percentChange.toFixed(2)}%</span> 
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                ₹{stock.close}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
