export default function ContactSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">お問い合わせ</h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 dark:text-gray-300">
              問い合わせフォーム（Phase 4で実装予定）
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}