'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface HomeHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

/**
 * HomeHeader component for displaying the main title and subtitle
 * @param title - The main title text
 * @param subtitle - The subtitle text
 * @param className - Additional CSS classes
 * @returns {JSX.Element} The HomeHeader component
 */
const HomeHeader: React.FC<HomeHeaderProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-bold text-blue-800 mb-2"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-600 text-lg"
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default HomeHeader;
