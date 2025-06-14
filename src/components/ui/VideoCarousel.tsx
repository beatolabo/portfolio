'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoData } from '@/types/video';

interface VideoCarouselProps {
  videos: VideoData[];
}

// 動画カード用コンポーネント
function VideoCard({ 
  video, 
  isMain = false, 
  onClick 
}: { 
  video: VideoData; 
  isMain?: boolean; 
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={`cursor-pointer group ${isMain ? '' : 'opacity-70 hover:opacity-100'}`}
      onClick={onClick}
      whileHover={{ scale: isMain ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`relative ${isMain ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'} rounded-xl overflow-hidden transition-shadow duration-300`}>
        {/* 16:9 アスペクト比を維持 */}
        <div className="relative w-full pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        {/* サブ動画用のオーバーレイ */}
        {!isMain && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-2">
              <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* 動画情報 */}
      <div className="mt-3 px-1">
        <h3 className={`font-semibold text-gray-900 dark:text-white line-clamp-2 ${
          isMain ? 'text-lg' : 'text-sm'
        }`}>
          {video.title}
        </h3>
        {video.description && (
          <p className={`text-gray-600 dark:text-gray-300 mt-1 line-clamp-1 ${
            isMain ? 'text-sm' : 'text-xs'
          }`}>
            {video.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 一周するループ機能
  const nextVideo = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
  };

  // 前後の動画インデックス
  const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;

  const currentVideo = videos[currentIndex];
  const prevVideoData = videos[prevIndex];
  const nextVideoData = videos[nextIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* メインレイアウト：デスクトップは3カラム、モバイルは縦積み */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
        
        {/* 左の動画（デスクトップのみ表示） */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`prev-${prevVideoData.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <VideoCard 
                video={prevVideoData} 
                onClick={prevVideo}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* メイン動画（中央・3カラム分） */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={`main-${currentVideo.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <VideoCard 
                video={currentVideo} 
                isMain={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 右の動画（デスクトップのみ表示） */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`next-${nextVideoData.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VideoCard 
                video={nextVideoData} 
                onClick={nextVideo}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* モバイル用ナビゲーションボタン */}
      <div className="flex lg:hidden justify-center space-x-4 mt-6">
        <button
          onClick={prevVideo}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg rounded-full p-3 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextVideo}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg rounded-full p-3 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* インジケーター */}
      {videos.length > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              onClick={() => goToVideo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}