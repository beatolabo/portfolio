'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoData } from '@/types/video';

interface VideoCarouselProps {
  videos: VideoData[];
}

// サムネイル/iframe切り替え式動画カード
function ThumbnailVideoCard({ 
  video, 
  isMain = false, 
  isVisible = true,
  hasLoadedIframe = false,
  onClick 
}: { 
  video: VideoData; 
  isMain?: boolean; 
  isVisible?: boolean;
  hasLoadedIframe?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className="cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3, 
        scale: isVisible ? 1 : 0.9,
        y: isVisible ? 0 : 20
      }}
      whileHover={{ 
        scale: isMain ? 1.02 : 1.05,
        y: isMain ? -5 : -8,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ 
        scale: isMain ? 0.98 : 0.95,
        transition: { duration: 0.1 }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        mass: 0.8
      }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <motion.div 
        className={`relative rounded-xl overflow-hidden ${
          isMain ? 'shadow-2xl' : 'shadow-lg'
        }`}
        whileHover={{
          boxShadow: isMain 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
            : "0 20px 40px -8px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.3 }
        }}
      >
        {/* 16:9 アスペクト比を維持 */}
        <div className="relative w-full pb-[56.25%]">
          {hasLoadedIframe ? (
            // iframe表示（読み込み済み）
            <motion.iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="eager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          ) : (
            // サムネイル表示（軽量）
            <>
              <motion.img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              />
              {/* 再生ボタンオーバーレイ */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <motion.div 
                  className="bg-red-600 rounded-full p-4"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "#dc2626",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.svg 
                    className="w-8 h-8 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path d="M8 5v14l11-7z"/>
                  </motion.svg>
                </motion.div>
              </div>
            </>
          )}
        </div>
        
        {/* サブ動画用の追加オーバーレイ（サムネイル時のみ） */}
        {!isMain && !hasLoadedIframe && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-full p-2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
      
      {/* 動画情報 */}
      <motion.div 
        className="mt-3 px-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.h3 
          className={`font-semibold text-gray-900 dark:text-white line-clamp-2 ${
            isMain ? 'text-lg' : 'text-sm'
          }`}
          whileHover={{ color: isMain ? "#3b82f6" : "#6366f1" }}
          transition={{ duration: 0.2 }}
        >
          {video.title}
        </motion.h3>
        {video.description && (
          <motion.p 
            className={`text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 ${
              isMain ? 'text-sm' : 'text-xs'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {video.description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());

  // iframe読み込み状態を管理（未使用だが将来の拡張用に保持）
  // const loadIframe = (index: number) => {
  //   setLoadedIframes(prev => new Set(prev).add(index));
  // };

  // iframe読み込み状態の管理（メイン動画のみ保持）
  const updateVideoSelection = (newIndex: number) => {
    // 新しいメイン動画のみiframeを読み込み
    setLoadedIframes(new Set([newIndex]));
    setCurrentIndex(newIndex);
  };

  // 一周するループ機能
  const nextVideo = () => {
    const newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    updateVideoSelection(newIndex);
  };

  const prevVideo = () => {
    const newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    updateVideoSelection(newIndex);
  };

  const goToVideo = (index: number) => {
    updateVideoSelection(index);
  };

  // 前後の動画インデックス
  const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;

  // 初回のメイン動画を読み込み
  useEffect(() => {
    updateVideoSelection(0);
  }, []);

  // 未使用変数をコメントアウト（将来の拡張用に保持）
  // const currentVideo = videos[currentIndex];
  // const prevVideoData = videos[prevIndex];
  // const nextVideoData = videos[nextIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* プリロード式レイアウト：全動画を同時レンダリング、表示切り替えのみ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        
        {/* 左の動画（デスクトップのみ表示） */}
        <div className="hidden lg:block relative">
          {videos.map((video, index) => {
            const isPrevVideo = index === prevIndex;
            return (
              <div
                key={`prev-${video.id}`}
                className={`${isPrevVideo ? 'relative' : 'absolute inset-0 invisible'}`}
              >
                <ThumbnailVideoCard 
                  video={video} 
                  isVisible={isPrevVideo}
                  hasLoadedIframe={loadedIframes.has(index)}
                  onClick={() => goToVideo(index)}
                />
              </div>
            );
          })}
        </div>

        {/* メイン動画（中央・3カラム分） */}
        <div className="lg:col-span-3 relative">
          {videos.map((video, index) => {
            const isCurrentVideo = index === currentIndex;
            return (
              <div
                key={`main-${video.id}`}
                className={`${isCurrentVideo ? 'relative' : 'absolute inset-0 invisible'}`}
              >
                <ThumbnailVideoCard 
                  video={video} 
                  isMain={true}
                  isVisible={isCurrentVideo}
                  hasLoadedIframe={loadedIframes.has(index)}
                />
              </div>
            );
          })}
        </div>

        {/* 右の動画（デスクトップのみ表示） */}
        <div className="hidden lg:block relative">
          {videos.map((video, index) => {
            const isNextVideo = index === nextIndex;
            return (
              <div
                key={`next-${video.id}`}
                className={`${isNextVideo ? 'relative' : 'absolute inset-0 invisible'}`}
              >
                <ThumbnailVideoCard 
                  video={video} 
                  isVisible={isNextVideo}
                  hasLoadedIframe={loadedIframes.has(index)}
                  onClick={() => goToVideo(index)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* モバイル用ナビゲーションボタン */}
      <motion.div 
        className="flex lg:hidden justify-center space-x-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.button
          onClick={prevVideo}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 backdrop-blur-sm"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "#f8fafc",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </motion.svg>
        </motion.button>
        <motion.button
          onClick={nextVideo}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 backdrop-blur-sm"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "#f8fafc",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* インジケーター */}
      {videos.length > 1 && (
        <motion.div 
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {videos.map((_, index) => (
            <motion.button
              key={index}
              className="rounded-full"
              onClick={() => goToVideo(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  backgroundColor: index === currentIndex ? "#3b82f6" : "#d1d5db",
                  width: index === currentIndex ? "32px" : "8px",
                  height: "8px"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  backgroundColor: { duration: 0.3 }
                }}
                whileHover={{
                  backgroundColor: index === currentIndex ? "#2563eb" : "#9ca3af"
                }}
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}