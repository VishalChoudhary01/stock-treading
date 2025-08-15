"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
        {/* Progress container */}
        <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          {/* Shimmer animation */}
          <motion.div
            className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '300%' }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-blue-500 dark:bg-blue-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '80%' }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Loading text with shimmer */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-gray-700 dark:text-gray-300 font-medium text-sm"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Loading content...
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;