import React from 'react';
import { motion } from 'framer-motion';

// Logo Variant 1: Minimalist Car Icon
export const MinimalistLogo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Car Body */}
        <motion.path
          d="M20 60 L80 60 L85 65 L80 70 L20 70 L15 65 Z"
          fill="#E6B325"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Car Windows */}
        <motion.path
          d="M25 55 L75 55 L75 60 L25 60 Z"
          fill="#2C3E50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="30"
          cy="70"
          r="6"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        />
        <motion.circle
          cx="70"
          cy="70"
          r="6"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        />
      </svg>
    </motion.div>
  );
};

// Logo Variant 2: Luxury Car
export const LuxuryLogo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.1 }}
      animate={{ 
        y: [0, -2, 0],
        rotate: [0, 1, -1, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Car Body - Luxury */}
        <motion.path
          d="M15 65 L85 65 L90 70 L85 75 L15 75 L10 70 Z"
          fill="url(#luxuryGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Car Windows */}
        <motion.path
          d="M20 60 L80 60 L80 65 L20 65 Z"
          fill="#2C3E50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Luxury Details */}
        <motion.path
          d="M25 55 L75 55 L75 60 L25 60 Z"
          fill="#E6B325"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="25"
          cy="75"
          r="8"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        />
        <motion.circle
          cx="75"
          cy="75"
          r="8"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 }}
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="luxuryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E6B325" />
            <stop offset="50%" stopColor="#F4D03F" />
            <stop offset="100%" stopColor="#E6B325" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

// Logo Variant 3: Speed & Motion
export const SpeedLogo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.1 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Speed Lines */}
        <motion.path
          d="M5 50 L20 50 M5 45 L18 45 M5 40 L15 40"
          stroke="#E6B325"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: [0, 1, 0],
            x: [0, 10, 20]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Car Body */}
        <motion.path
          d="M25 60 L75 60 L80 65 L75 70 L25 70 L20 65 Z"
          fill="#2C3E50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        
        {/* Car Windows */}
        <motion.path
          d="M30 55 L70 55 L70 60 L30 60 Z"
          fill="#E6B325"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="35"
          cy="70"
          r="5"
          fill="#E6B325"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 }}
        />
        <motion.circle
          cx="65"
          cy="70"
          r="5"
          fill="#E6B325"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 }}
        />
      </svg>
    </motion.div>
  );
};

// Logo Variant 4: Road & Car
export const RoadLogo = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-10 h-10',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Road */}
        <motion.path
          d="M10 75 L90 75 L85 85 L15 85 Z"
          fill="#2C3E50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Road Lines */}
        <motion.path
          d="M20 80 L80 80"
          stroke="#E6B325"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        
        {/* Car */}
        <motion.path
          d="M30 65 L70 65 L75 70 L70 75 L30 75 L25 70 Z"
          fill="#E6B325"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />
        
        {/* Car Windows */}
        <motion.path
          d="M35 60 L65 60 L65 65 L35 65 Z"
          fill="#2C3E50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        />
        
        {/* Wheels */}
        <motion.circle
          cx="40"
          cy="75"
          r="4"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />
        <motion.circle
          cx="60"
          cy="75"
          r="4"
          fill="#2C3E50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2 }}
        />
      </svg>
    </motion.div>
  );
};



