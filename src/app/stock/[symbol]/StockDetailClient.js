"use client";
import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import StockChart from "@/app/components/organism/StockChart";
import { motion } from "motion/react";

export default function StockDetailClient({ initialData, symbol }) {
  if (!initialData || initialData.length === 0) return null;

  const stockName = initialData?.stockName || symbol;
  const firstClose = initialData[0].prev_close;
  const latest = initialData[initialData.length - 1].close;
  const change = latest - firstClose;
  const changePercent = ((change / firstClose) * 100).toFixed(2);
  const isUp = change >= 0;

  const stats = [
    { label: "Open", value: initialData[0].open.toFixed(2) },
    { label: "High", value: Math.max(...initialData.map(p => p.high)).toFixed(2) },
    { label: "Low", value: Math.min(...initialData.map(p => p.low)).toFixed(2) },
    { label: "Volume", value: initialData.reduce((sum, p) => sum + p.volume, 0).toLocaleString() }
  ];

  return (
    <div className="md:max-w-7xl md:mt-10 mx-auto px-3 sm:px-4 py-16 sm:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
          className="text-2xl sm:text-3xl font-bold"
        >
          {symbol}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-2 text-xl font-semibold ${isUp ? "text-gainText dark:text-gainDarkText" : "text-lossText dark:text-lossDarkText"}`}
        >
          {isUp ? <FaArrowUp /> : <FaArrowDown />}
          ₹{latest.toFixed(2)} ({changePercent}%)
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.3, type: "spring" }}
            className="bg-glassBg dark:bg-glassDarkBg p-4 rounded-lg shadow"
          >
            <p className="text-sm">{stat.label}</p>
            <p className="text-xl font-semibold">
              {stat.label === "Volume" ? stat.value : `₹${stat.value}`}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <StockChart symbol={symbol} priceData={initialData} timePeriod={1} />
    </div>
  );
}
