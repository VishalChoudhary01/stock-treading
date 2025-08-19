"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '@/app/hooks/useDebounce';
import Input from '@/app/components/atoms/input';
import SuggestionList from '@/app/components/moleclues/suggestionList';
import apiClient from '@/app/lib/api/apiClients';
import { IoIosClose } from "react-icons/io";



const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm.trim()) {
        setSuggestions([]);
        return;
      }
      
      try {
        setLoading(true);
        const data = await apiClient.get(
          `/api/assignment/search?keyword=${encodeURIComponent(debouncedSearchTerm)}&length=10`
        );
        setSuggestions(data);
      } catch (error) {
        console.error('Search failed:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  const handleSelect = (stock) => {
    setSearchTerm('');
    setSuggestions([]);
    router.push(`/stock/${stock.symbol}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center font-poppins">
        <Input
          value={searchTerm}
          onInputChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Stocks..."
          inputStyle="w-full h-12 px-4 font-poppins border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:dark:ring-blue-300/15 dark:bg-neutral-800/30 dark:border-gray-600 dark:text-white placeholder:text-gray-200 dark:placeholder:text-gray-200/80"
        />
        {searchTerm && (
          <button 
            onClick={clearSearch}
            className="ml-2 text-gray-200 hover:text-gray-700 dark:text-gray-200  dark:hover:text-gray-300"
            aria-label="Clear search"
          >
            <IoIosClose className='md:text-3xl'/>
          </button>
        )}
      </div>
      
      {(searchTerm && suggestions.length > 0) && (
        <SuggestionList 
          suggestions={suggestions} 
          loading={loading}
          onSelect={handleSelect} 
        />
      )}
    </div>
  );
};

export default SearchBar;