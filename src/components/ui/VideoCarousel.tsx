'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div
      className={`cursor-pointer group transition-all duration-150 ${
        isVisible ? (isMain ? '' : 'opacity-70 hover:opacity-100') : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClick}
      style={{
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <div className={`relative ${isMain ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'} rounded-xl overflow-hidden transition-shadow duration-200`}>
        {/* 16:9 アスペクト比を維持 */}
        <div className="relative w-full pb-[56.25%]">
          {hasLoadedIframe ? (
            // iframe表示（読み込み済み）
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="eager"
            />
          ) : (
            // サムネイル表示（軽量）
            <>
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                loading="lazy"
              />
              {/* 再生ボタンオーバーレイ */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* サブ動画用の追加オーバーレイ（サムネイル時のみ） */}
        {!isMain && !hasLoadedIframe && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
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
    </div>
  );
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set());

  // iframe読み込み状態を管理
  const loadIframe = (index: number) => {
    setLoadedIframes(prev => new Set(prev).add(index));
  };

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

  const currentVideo = videos[currentIndex];
  const prevVideoData = videos[prevIndex];
  const nextVideoData = videos[nextIndex];

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