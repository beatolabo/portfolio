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
          {/* メインタイトル */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              delay: 0.2,
              duration: 1
            }}
            viewport={{ once: true }}
          >
            Profile
          </motion.h2>

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
              className="w-full h-full bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
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

          {/* SNSリンクセクション */}
          <motion.div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                title: "YouTube",
                description: "動画コンテンツをチェック",
                color: "red",
                url: "https://www.youtube.com/channel/UCQMrB7xHXYxMfMQG5PvEi-A"
              },
              {
                icon: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 15.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm3-6c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-3-3c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5z",
                title: "niconico",
                description: "ニコニコ動画でも配信",
                color: "orange",
                url: "https://www.nicovideo.jp/user/132049322/video?ref=pc_userpage_menu"
              },
              {
                icon: "M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm5.6 8.4c0 3.1-1.4 4.4-3.1 4.4-1.3 0-2.3-.8-2.7-1.7 0 0-.6 2.4-.7 2.9-.4 1.8-1.6 3.6-1.7 3.8-.1.1-.2.1-.2 0 0-.2-.3-3.3 0-4.7.1-.7 1.2-5.1 1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .8-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3-.1.3-.2 1-.2 1.1 0 .2-.1.2-.2.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6z",
                title: "SoundCloud",
                description: "楽曲をストリーミング",
                color: "orange",
                url: "https://soundcloud.com/beatolabo"
              },
              {
                icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z",
                title: "GitHub",
                description: "開発コードを公開",
                color: "gray",
                url: "https://github.com/beatolabo"
              }
            ].map((platform, index) => (
              <motion.a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg backdrop-blur-sm hover:no-underline"
                custom={index}
                variants={skillCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <div 
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto ${
                    platform.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                    platform.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900' :
                    platform.color === 'gray' ? 'bg-gray-100 dark:bg-gray-700' :
                    'bg-gray-100 dark:bg-gray-900'
                  }`}
                >
                  <svg className={`w-6 h-6 ${
                    platform.color === 'red' ? 'text-red-600 dark:text-red-400' :
                    platform.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                    platform.color === 'gray' ? 'text-gray-600 dark:text-gray-300' :
                    'text-gray-600 dark:text-gray-400'
                  }`} fill="currentColor" viewBox="0 0 24 24">
                    <path d={platform.icon}/>
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {platform.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {platform.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}