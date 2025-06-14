import { VideoData } from '@/types/video';

interface YouTubeVideoProps {
  video: VideoData;
  className?: string;
}

export default function YouTubeVideo({ video, className = '' }: YouTubeVideoProps) {
  return (
    <div className={`relative w-full ${className }`}>
      {/* 16:9 アスペクト比を維持 */}
      <div className="relative w-full pb-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      
      {/* 動画情報 */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}