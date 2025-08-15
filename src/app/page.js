"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "@/app/components/moleclues/searchBar";
import TickerBar from "@/app/components/moleclues/TickerBar";
import StockList from "@/app/components/moleclues/stockList";
import apiClient from "@/app/lib/api/apiClients";
import banner from "../../public/banner/banner.jpg";
import Loader from "./components/templates/loaders/loader";
import {motion} from 'motion/react'



export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/api/assignment/index/NIFTY/movers/");
        setData(res);
      } catch (error) {
        console.error("Error fetching stock movers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader/>;
  if (!data) return <div className="p-4">No stock data found</div>;

  return (
    <div className="min-h-screen bg-linear-180 from-[#f1fafc] to-[#b1e2f5d2] dark:bg-linear-180 dark:from-[#09090a] dark:to-[#00050c]">
      <TickerBar stocks={[...(data.gainers || []), ...(data.losers || [])]} />

      <section className="relative w-full md:h-[85vh] h-[52vh] flex items-center justify-center md:pt-7 pt-11 ">
        <Image
          src={banner}
          alt="Stock market background"
          fill
          priority
          quality={75}
          className="object-cover"
        />
        <div className="absolute  inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-4 max-w-2xl md:space-y-6 space-y-3.5 ">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
          className="text-3xl md:text-5xl font-bold">Stocks</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
           className="mt-4 text-neutral-100  md:text-lg text-[1.1rem]">
            Search and track your favorite stocks with real-time price data & charts.
          </motion.p>
          <div className="md:mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
       className="md:max-w-7xl mx-auto px-4 md:pb-40 md:pt-11 py-14 ">
        {console.log("Data:", data)}
        <StockList gainers={data.gainers} losers={data.losers} />
      </motion.section>
    </div>
  );
}
