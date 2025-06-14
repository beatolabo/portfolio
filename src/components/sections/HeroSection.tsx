export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Music Portfolio
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          アニメソングリミックスアーティスト
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">
              YouTube動画カルーセル（Phase 2で実装予定）
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}