'use client';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 現在のセクションを検出 (クライアントサイドのみ)
  useEffect(() => {
    if (!isClient) return; // クライアントサイドでのみ実行
    
    const sections = ['hero', 'profile', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // ビューポートの中央50%を基準
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isClient]);

  // セクションへのスムーズスクロール
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* スクロール進捗インジケーター */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* フローティングナビゲーション */}
      {isClient && (
        <>
          {/* デスクトップ用ナビゲーション */}
          <motion.nav
            className="fixed top-8 right-8 z-40 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-full p-2 shadow-xl border border-white/20">
              <div className="flex flex-col space-y-2">
                {[
                  { id: 'hero', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                ].map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`p-3 rounded-full transition-all duration-300 group relative ${
                        isActive 
                          ? 'bg-white/30 dark:bg-gray-600/30 text-gray-800 dark:text-white' 
                          : 'bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-600/30 text-gray-800 dark:text-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title={item.label}
                      animate={{
                        borderColor: isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent'
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      style={{
                        border: '1px solid transparent'
                      }}
                    >
                      <motion.svg 
                        className="w-5 h-5 relative z-10" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </motion.svg>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.nav>

          {/* モバイル用ハンバーガーメニューボタン */}
          <motion.button
            className="fixed top-6 right-6 z-50 lg:hidden p-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md rounded-full shadow-xl border border-white/20"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 90 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <svg 
                className="w-6 h-6 text-gray-800 dark:text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.div>
          </motion.button>

          {/* モバイル用メニュードロワー */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed top-0 right-0 h-screen w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md z-40 lg:hidden shadow-2xl"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
            <div className="flex flex-col h-full pt-20 px-6">
              <div className="flex flex-col space-y-4">
                {[
                  { id: 'hero', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { id: 'contact', label: 'Contact', icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                ].map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 text-left ${
                        isActive 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                          : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-800 dark:text-white'
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ 
                        opacity: isMobileMenuOpen ? 1 : 0,
                        x: isMobileMenuOpen ? 0 : 50
                      }}
                      transition={{ 
                        delay: isMobileMenuOpen ? 0.1 + index * 0.1 : 0,
                        duration: 0.3
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg 
                        className="w-6 h-6" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span className="text-lg font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
                </div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>

          {/* モバイルメニュー開閉時のオーバーレイ */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}

      {/* メインコンテンツ */}
      <main className="relative">
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="profile">
          <ProfileSection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* フッター */}
      <Footer />

      {/* スクロールアップボタン */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg z-40"
        onClick={() => scrollToSection('hero')}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
}
