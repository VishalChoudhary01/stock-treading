import React from 'react'
import { FaHome } from "react-icons/fa";
import Head from 'next/head';
import { IoIosArrowDown } from "react-icons/io";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <Head>
          <title>{symbol} - Not Found</title>
        </Head>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-8 max-w-md w-full shadow-xl border border-red-200 dark:border-red-800/50">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <IoIosArrowDown className="text-3xl" />
          </div>
          
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Data Not Available
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn&apos;t find any data for <span className="font-semibold">{symbol}&quot;</span>
          </p>
          
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <FaHome />
            Return to Home
          </button>
        </div>
      </div>
  )
}

export default Error