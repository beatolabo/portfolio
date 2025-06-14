import VideoCarousel from '@/components/ui/VideoCarousel';
import { sampleVideos } from '@/types/video';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Music Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            アニメソングリミックスアーティスト
          </p>
        </div>
        
        {/* YouTube動画カルーセル */}
        <div className="w-full">
          <VideoCarousel videos={sampleVideos} />
        </div>
      </div>
    </section>
  );
}