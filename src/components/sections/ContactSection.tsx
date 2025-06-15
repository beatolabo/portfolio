'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // パララックス効果
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const formY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS設定（環境変数で管理することを推奨）
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS設定が不完全です。環境変数を確認してください。');
        throw new Error('EmailJS設定が不完全です');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('メール送信エラー:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 動的背景 */}
      <motion.div 
        className="absolute -top-32 -bottom-32 left-0 right-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{ y: backgroundY }}
      />
      
      {/* 装飾的な背景要素 */}
      <motion.div
        className="absolute top-32 left-16 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-60"
        style={{ y: formY }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-56 h-56 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-2xl opacity-40"
        style={{ y: backgroundY }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* ヘッダー */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Contact
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              ご質問・お仕事のご依頼などお気軽にお問い合わせください
            </p>
          </motion.div>

          {/* フォーム */}
          <motion.div 
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* お名前 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  animate={{ 
                    color: focusedField === 'name' ? '#3b82f6' : undefined,
                    scale: focusedField === 'name' ? 1.02 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  お名前 <span className="text-red-500">*</span>
                </motion.label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="山田太郎"
                    whileFocus={{
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      scale: 1.01
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {focusedField === 'name' && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* メールアドレス */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  animate={{ 
                    color: focusedField === 'email' ? '#3b82f6' : undefined,
                    scale: focusedField === 'email' ? 1.02 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  メールアドレス <span className="text-red-500">*</span>
                </motion.label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="example@email.com"
                    whileFocus={{
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      scale: 1.01
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {focusedField === 'email' && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* メッセージ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.label 
                  htmlFor="message" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  animate={{ 
                    color: focusedField === 'message' ? '#3b82f6' : undefined,
                    scale: focusedField === 'message' ? 1.02 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  メッセージ <span className="text-red-500">*</span>
                </motion.label>
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
                    placeholder="お問い合わせ内容をご記入ください"
                    whileFocus={{
                      borderColor: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
                      scale: 1.01
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {focusedField === 'message' && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500/5 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              {/* 送信ボタン */}
              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg relative overflow-hidden"
                  whileHover={!isSubmitting ? { 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
                    background: "linear-gradient(to right, #2563eb, #7c3aed)"
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  animate={{
                    background: isSubmitting 
                      ? "linear-gradient(to right, #9ca3af, #6b7280)"
                      : "linear-gradient(to right, #3b82f6, #8b5cf6)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    background: { duration: 0.3 }
                  }}
                  style={{
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {/* ホバー時のシマー効果 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  <motion.span
                    className="relative z-10 flex items-center justify-center"
                    animate={{ 
                      color: isSubmitting ? "#d1d5db" : "#ffffff"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.svg 
                          className="animate-spin -ml-1 mr-3 h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                          animate={{ rotate: 360 }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </motion.svg>
                        送信中...
                      </>
                    ) : (
                      '送信する'
                    )}
                  </motion.span>
                </motion.button>
              </motion.div>

              {/* ステータスメッセージ */}
              {submitStatus === 'success' && (
                <motion.div 
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      メッセージを送信しました！ありがとうございます。
                    </span>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 dark:text-red-300 font-medium">
                      送信に失敗しました。しばらくしてから再度お試しください。
                    </span>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* 追加情報 */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              通常24時間以内にご返信いたします
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}