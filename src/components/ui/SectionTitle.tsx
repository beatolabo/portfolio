'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
  delay?: number;
}

export default function SectionTitle({ children, delay = 0.2 }: SectionTitleProps) {
  return (
    <motion.h2 
      className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: delay,
        duration: 1
      }}
    >
      {children}
    </motion.h2>
  );
}