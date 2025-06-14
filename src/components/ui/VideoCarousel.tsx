'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoData } from '@/types/video';
import YouTubeVideo from './YouTubeVideo';

interface VideoCarouselProps {
  videos: VideoData[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videosPerView, setVideosPerView] = useState(1);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // レスポンシブ対応：画面サイズに応じて表示する動画数を調整
  useEffect(() => {
    const updateVideosPerView = () => {
      if (window.innerWidth >= 1024) {
        setVideosPerView(3); // デスクトップ：3つ
      } else if (window.innerWidth >= 768) {
        setVideosPerView(2); // タブレット：2つ
      } else {
        setVideosPerView(1); // モバイル：1つ
      }
    };

    updateVideosPerView();
    window.addEventListener('resize', updateVideosPerView);
    return () => window.removeEventListener('resize', updateVideosPerView);
  }, []);

  const maxIndex = Math.max(0, videos.length - videosPerView);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const videoWidth = `${100 / videosPerView}%`;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* カルーセルコンテナ */}
      <div ref={constraintsRef} className="overflow-hidden rounded-lg">
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * (100 / videosPerView)}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragEnd={(_, info) => {
            const threshold = 50;
            if (info.offset.x > threshold && currentIndex > 0) {
              prevVideo();
            } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
              nextVideo();
            }
          }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="flex-shrink-0 px-2"
              style={{ width: videoWidth }}
            >
              <YouTubeVideo video={video} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ナビゲーションボタン */}
      <AnimatePresence>
        {videos.length > 1 && (
          <>
            {/* 前へボタン */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={prevVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* 次へボタン */}
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
              onClick={nextVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* インジケーター */}
      {maxIndex > 0 && (
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-blue-500'
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