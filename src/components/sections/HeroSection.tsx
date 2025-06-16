'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import VideoCarousel from '@/components/ui/VideoCarousel';
import { sampleVideos } from '@/types/video';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const { scrollY } = useScroll();
  
  // パララックス効果用のトランスフォーム
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200]);
  const textY = useTransform(scrollY, [0, 500], [0, -100]);
  const carouselY = useTransform(scrollY, [0, 800], [0, -50]);
  
  // スプリングアニメーション
  const springX = useSpring(mousePosition.x, { stiffness: 100, damping: 10 });
  const springY = useSpring(mousePosition.y, { stiffness: 100, damping: 10 });
  
  // スプリング値の変換
  const springXNeg = useTransform(springX, (x) => x * -0.5);
  const springYNeg = useTransform(springY, (y) => y * -0.5);
  const springXSmall = useTransform(springX, (x) => x * 0.3);
  const springYSmall = useTransform(springY, (y) => y * 0.3);

  // クライアントサイド判定
  useEffect(() => {
    setIsClient(true);
  }, []);

  // マウス追従効果 (クライアントサイドのみ)
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.01;
      const y = (e.clientY - window.innerHeight / 2) * 0.01;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isClient]);

  // フローティング要素のアニメーション
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 動的背景 */}
      <motion.div 
        className="absolute -top-64 -bottom-64 left-0 right-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{ y: backgroundY }}
      />
      
      {/* フローティング装飾要素 */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full opacity-60"
        variants={floatingVariants}
        animate="animate"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40"
        variants={floatingVariants}
        animate="animate"
        initial={{ animationDelay: '1s' }}
        style={{ x: springXNeg, y: springYNeg }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-1 h-1 bg-blue-300 rounded-full opacity-80"
        variants={floatingVariants}
        animate="animate"
        initial={{ animationDelay: '2s' }}
        style={{ x: springXSmall, y: springYSmall }}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* ヘッダーテキスト */}
        <motion.div 
          className="text-center mb-12"
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 1, 
              ease: [0.23, 1, 0.32, 1],
              delay: 0.2 
            }}
          >
            beatolabo
          </motion.h1>
          
          
          <motion.p 
            className="text-base text-white/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.23, 1, 0.32, 1],
              delay: 0.5 
            }}
          >
            アニメソングリミックスアーティスト
          </motion.p>
        </motion.div>
        
        {/* YouTube動画カルーセル */}
        <motion.div 
          className="w-full"
          style={{ y: carouselY }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.23, 1, 0.32, 1],
            delay: 1.0 
          }}
        >
          <VideoCarousel videos={sampleVideos} />
        </motion.div>
      </div>
      
      {/* スクロール促進インジケーター */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center text-gray-400 dark:text-gray-500"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}