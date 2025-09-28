import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-lg',
    large: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Logo Icon */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 2,
          ease: "easeInOut"
        }}
      >
        {/* Car Icon with Road */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          fill="none"
        >
          {/* Road Background */}
          <motion.path
            d="M10 70 L90 70 L85 80 L15 80 Z"
            fill="#2C3E50"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          
          {/* Road Lines */}
          <motion.path
            d="M20 75 L80 75"
            stroke="#E6B325"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          
          {/* Car Body */}
          <motion.path
            d="M25 60 L75 60 L80 65 L75 70 L25 70 L20 65 Z"
            fill="#E6B325"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          {/* Car Windows */}
          <motion.path
            d="M30 55 L70 55 L70 60 L30 60 Z"
            fill="#2C3E50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          />
          
          {/* Car Wheels */}
          <motion.circle
            cx="35"
            cy="70"
            r="5"
            fill="#2C3E50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
          <motion.circle
            cx="65"
            cy="70"
            r="5"
            fill="#2C3E50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 1.7 }}
          />
          
          {/* Speed Lines */}
          <motion.path
            d="M5 50 L15 50 M5 45 L12 45 M5 40 L10 40"
            stroke="#E6B325"
            strokeWidth="2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: [0, 1, 0], x: [0, 10, 20] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.span 
            className={`font-bold text-[#2C3E50] ${textSizes[size]}`}
            animate={{ 
              color: ['#2C3E50', '#E6B325', '#2C3E50']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatDelay: 2 
            }}
          >
            CAR RENTAL
          </motion.span>
          <motion.span 
            className="text-xs text-[#E6B325] font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Premium Service
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;



