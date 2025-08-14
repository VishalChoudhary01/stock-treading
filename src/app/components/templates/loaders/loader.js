"use client";
import { motion } from 'framer-motion';

const Loader = () => {
  const tickerItems = ['AAPL', 'TSLA', 'MSFT', 'AMZN', 'GOOGL', 'NVDA', 'META'];
  
  return (
    <div className="flex fixed bg-black/15 backdrop-blur-3xl inset-0 flex-col items-center justify-center space-y-4">
      <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative w-72 h-8 overflow-hidden">
        <motion.div
          className="absolute flex space-x-8"
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...tickerItems, ...tickerItems].map((symbol, index) => (
            <div key={index} className="flex items-center space-x-8">
              <span className="text-lg font-mono font-bold text-gray-700">{symbol}</span>
              <motion.span 
                className="text-green-500 font-medium"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                +{(Math.random() * 5).toFixed(2)}%
              </motion.span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loader;