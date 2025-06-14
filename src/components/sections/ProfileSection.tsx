export default function ProfileSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-8 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">アイコン</p>
          </div>
          <h2 className="text-3xl font-bold mb-6">プロフィール</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            自己紹介テキスト（Phase 3で実装予定）
          </p>
        </div>
      </div>
    </section>
  );
}