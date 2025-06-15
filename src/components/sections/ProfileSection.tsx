'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果用のトランスフォーム
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const iconY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // スキルカードのスタッガードアニメーション設定
  const skillCardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.15,
        duration: 0.8
      }
    })
  };

  // テキストのスタッガードアニメーション
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        delay: index * 0.2,
        duration: 0.8
      }
    })
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 動的背景 */}
      <motion.div 
        className="absolute -top-32 -bottom-32 left-0 right-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
        style={{ y: backgroundY }}
      />
      
      {/* 装飾的な背景要素 */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl opacity-60"
        style={{ y: iconY }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-48 h-48 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-xl opacity-40"
        style={{ y: textY }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* アイコン */}
          <motion.div 
            className="relative w-40 h-40 mx-auto mb-8"
            style={{ y: iconY }}
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            whileInView={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
              duration: 1.2
            }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <motion.div 
              className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.svg 
                className="w-20 h-20 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </motion.svg>
            </motion.div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20 blur-lg"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* メインタイトル */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.4,
              duration: 1
            }}
            viewport={{ once: true }}
          >
            Profile
          </motion.h2>

          {/* 自己紹介テキスト */}
          <motion.div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
            {[
              "アニメソングリミックスアーティストとして活動している。多様な楽曲を独自のスタイルでリミックスし、新しい音楽体験を提供している。",
              "クラシックなアニメソングから最新のヒット曲まで幅広く扱い、電子音楽の技術を駆使したサウンドデザインが特徴である。",
              "YouTubeを中心に作品を発表し、音楽を通じて多くの人に新しい感動と体験を届けることを目指している。"
            ].map((text, index) => (
              <motion.p 
                key={index}
                className="leading-relaxed"
                custom={index}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          {/* スキルセクション */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: "M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",
                title: "Music Production",
                description: "DAWを使った楽曲制作・リミックス",
                color: "blue"
              },
              {
                icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
                title: "Sound Design",
                description: "シンセサイザーを活用した音響設計",
                color: "purple"
              },
              {
                icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
                title: "Mixing & Mastering",
                description: "プロレベルのミキシング・マスタリング",
                color: "green"
              }
            ].map((skill, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm"
                custom={index}
                variants={skillCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)",
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${
                    skill.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    skill.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                    skill.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    'bg-gray-100 dark:bg-gray-900'
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className={`w-6 h-6 ${
                    skill.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    skill.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    skill.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d={skill.icon}/>
                  </svg>
                </motion.div>
                <motion.h3 
                  className="font-semibold text-lg mb-2"
                  whileHover={{ 
                    color: skill.color === 'blue' ? '#2563eb' :
                           skill.color === 'purple' ? '#9333ea' :
                           skill.color === 'green' ? '#16a34a' :
                           '#374151'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.title}
                </motion.h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}