"use client";
import React from "react";
import Image from "next/image";
import SearchBar from "@/app/components/moleclues/searchBar";
import TickerBar from "@/app/components/moleclues/TickerBar";
import StockList from "@/app/components/moleclues/stockList";
import banner from "../../public/banner/banner.jpg";
import { motion } from "framer-motion";

export default function HomeClient({ initialData }) {
  if (!initialData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-500">Failed to load data. Please try again later.</p>
      </div>
    );
  }

  const { gainers = [], losers = [] } = initialData;

  return (
    <div className="min-h-screen">
      <TickerBar stocks={[...gainers, ...losers]} />

      <section className="relative w-full md:h-[85vh] h-[52vh]">
        <Image
          src={banner}
          alt="Stock market background"
          fill
          priority
          quality={75}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto h-full flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Stocks
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-neutral-100 md:text-lg text-[1.1rem]"
          >
            Search and track your favorite stocks with real-time price data & charts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 w-full max-w-md mx-auto"
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="md:max-w-7xl mx-auto px-4 md:pb-40 md:pt-11 py-14"
      >
        <StockList gainers={gainers} losers={losers} />
      </motion.section>
    </div>
  );
}
