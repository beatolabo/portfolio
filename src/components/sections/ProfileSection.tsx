'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';

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
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
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
          {/* メインタイトル */}
          <motion.div style={{ y: textY }}>
            <SectionTitle delay={0.2}>
              Profile
            </SectionTitle>
          </motion.div>

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
              delay: 0.4,
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
              className="w-full h-full bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
              whileHover={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                background: "#f8fafc"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="/icon.png"
                alt="beatolabo アイコン"
                className="w-32 h-32 object-contain scale-150"
                loading="eager"
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>
          </motion.div>

          {/* 自己紹介テキスト */}
          <motion.div className="space-y-6 text-lg text-gray-700 dark:text-gray-300" style={{ wordBreak: 'keep-all', overflowWrap: 'anywhere', textWrap: 'balance' }}>
            {[
              "beatolaboはアニメソングリミックスを中心に音楽制作をしている。大好きなアニメの世界観を音楽に込めたり、異なる楽曲をマッシュアップすることで、聴く人に新しい感動を届けている。",
              "また、音楽制作の枠を超え、AI技術・3Dビジュアル・プログラミングを駆使した実験的なアプローチを重視している。テクノロジーと芸術の融合により、従来の音楽体験を拡張する作品を追求している。",
              "下記のプラットフォームで活動中だ。もしよろしければフォローしていただけると、とても励みになる。"
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

          {/* メインプラットフォーム（音楽系） */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 max-w-2xl mx-auto">
              {[
                {
                  icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                  title: "YouTube",
                  description: "動画コンテンツをチェック",
                  color: "red",
                  url: "https://www.youtube.com/channel/UCQMrB7xHXYxMfMQG5PvEi-A"
                },
                {
                  icon: "M.4787 7.534v12.1279A2.0213 2.0213 0 0 0 2.5 21.6832h2.3888l1.323 2.0948a.4778.4778 0 0 0 .4043.2205.4778.4778 0 0 0 .441-.2205l1.323-2.0948h6.9828l1.323 2.0948a.4778.4778 0 0 0 .441.2205c.1838 0 .3308-.0735.4043-.2205l1.323-2.0948h2.6462a2.0213 2.0213 0 0 0 2.0213-2.0213V7.5339a2.0213 2.0213 0 0 0-2.0213-1.9845h-7.681l4.4468-4.4469L17.1637 0l-5.1452 5.1452L6.8 0 5.6973 1.1025l4.4102 4.4102H2.5367a2.0213 2.0213 0 0 0-2.058 2.058z",
                  title: "niconico",
                  description: "ニコニコ動画でも配信",
                  color: "gray",
                  url: "https://www.nicovideo.jp/user/132049322/video?ref=pc_userpage_menu"
                },
                {
                  icon: "M20.5 11c-.19-2.28-2.09-4.07-4.42-4.07-.42 0-.84.07-1.23.2C14.54 5.35 12.9 4 10.92 4c-2.21 0-4 1.79-4 4 0 .26.03.51.08.75C4.72 8.93 2.92 10.85 2.92 13.17c0 2.43 1.97 4.4 4.4 4.4h11.84c1.88 0 3.41-1.53 3.41-3.41s-1.53-3.41-3.41-3.41c-.76 0-1.47.25-2.04.68",
                  title: "SoundCloud",
                  description: "楽曲をストリーミング",  
                  color: "orange",
                  url: "https://soundcloud.com/beatolabo"
                }
              ].map((platform, index) => (
                <motion.a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white dark:bg-gray-800 pt-8 pb-6 px-6 rounded-xl backdrop-blur-sm hover:no-underline group"
                  custom={index}
                  variants={skillCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  animate={{
                    scale: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0
                    }
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0 20px 40px -8px rgba(0, 0, 0, 0.15)",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0
                    }
                  }}
                  style={{
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                >
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${
                      platform.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                      platform.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900' :
                      platform.color === 'gray' ? 'bg-gray-100 dark:bg-gray-700' :
                      'bg-gray-100 dark:bg-gray-900'
                    }`}
                  >
                    {platform.title === 'SoundCloud' ? (
                      <Image 
                        src="/soundcloud-24.svg" 
                        alt="SoundCloud" 
                        width={29}
                        height={29}
                        className="object-contain"
                      />
                    ) : (
                      <svg className={`${
                        platform.title === 'GitHub' ? 'w-7 h-7' : 'w-6 h-6'
                      } ${
                        platform.color === 'red' ? 'text-red-600 dark:text-red-400' :
                        platform.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                        platform.color === 'gray' ? 'text-gray-600 dark:text-gray-300' :
                        'text-gray-600 dark:text-gray-400'
                      }`} fill="currentColor" viewBox="0 0 24 24">
                        <path d={platform.icon}/>
                      </svg>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white transition-colors duration-200 group-hover:text-blue-500">
                    {platform.title}
                  </h3>
                </motion.a>
              ))}
            </div>

            {/* その他のリンク */}
            <motion.div 
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.a
                href="https://github.com/beatolabo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-base">開発はこちら</span>
                <motion.div
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </motion.div>
              </motion.a>

              <span className="hidden sm:block text-gray-300 dark:text-gray-600">|</span>

              <motion.a
                href="https://x.com/beatolabo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-base">つぶやきはこちら</span>
                <motion.div
                  className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors duration-200"
                  whileHover={{ rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.div>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}