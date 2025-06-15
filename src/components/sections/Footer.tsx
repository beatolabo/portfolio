'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} beatolabo. All rights reserved.
          </p>
          
          {/* Icons8 credit */}
          <p className="text-xs text-gray-500 dark:text-gray-500">
            <a 
              href="https://icons8.com/icon/102746/soundcloud" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              SoundCloud
            </a>
            {' '}アイコン by{' '}
            <a 
              href="https://icons8.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Icons8
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}