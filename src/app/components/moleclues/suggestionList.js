"use client";
import React from "react";
import AutoCompleteSpinner from "../templates/loaders/autoCompleteSpinner";

const SuggestionList = ({ suggestions = [], loading, onSelect }) => {
  if (!loading && !suggestions.length) return null;

  return (
    <ul className="absolute z-10 w-full bg-sectionBg dark:bg-sectionDarkBg backdrop-blur-3xl border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto scrollbar">
      {loading ? (
        <li className="flex items-center justify-center py-4">
          <AutoCompleteSpinner />
        </li>
      ) : (
        suggestions.map((stock) => (
          <li
            key={stock.symbol}
            className="px-4 py-3 backdrop-blur-3xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
            onClick={() => onSelect(stock)}
          >
            <div>
              <div className="font-medium dark:text-neutral-200 text-neutral-900">
                {stock.symbol}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stock.name}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {stock.exchange}
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default SuggestionList;
