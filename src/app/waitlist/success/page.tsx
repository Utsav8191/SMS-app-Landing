'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Home, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { submitWaitlistFeedback } from '@/actions/submitWaitlist';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rowNumber = parseInt(searchParams.get('row') || '0', 10);

  const [frustration, setFrustration] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!frustration.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await submitWaitlistFeedback(rowNumber || 2, frustration);
      if (response.success) {
        setFeedbackSubmitted(true);
      } else {
        setErrorMessage(response.message || 'Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1D4ED8]/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 blur-3xl -z-10" />

      {/* Navigation Header */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex justify-between items-center">
          <Link href="/" className="font-sans font-extrabold text-2xl text-[#1D4ED8] tracking-tight">
            Alpine Grow
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-xl w-full bg-white rounded-[24px] shadow-2xl border border-gray-200/80 p-8 md:p-10 text-center space-y-8"
        >
          <AnimatePresence mode="wait">
            {!feedbackSubmitted ? (
              <motion.div
                key="feedback-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 text-left"
              >
                {/* Success Icon */}
                <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-10 h-10 text-green-500" />
                </div>

                {/* Success Messaging */}
                <div className="space-y-3 text-center">
                  <h1 className="text-3xl font-extrabold text-[#102970] tracking-tight leading-tight font-display">
                    You're on the list!
                  </h1>
                  <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                    Want to skip the queue? Tell us your single biggest frustration with your current SMS provider.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Feedback Input Form */}
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="flex flex-col gap-1.5 font-body">
                    <textarea
                      id="frustration"
                      rows={4}
                      placeholder="e.g. Constant server downtime during exam periods, slow parent notifications, or complicated UI..."
                      disabled={isSubmitting}
                      value={frustration}
                      onChange={(e) => setFrustration(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#1D4ED8]/20 outline-none focus:border-[#1D4ED8] transition-all text-sm text-gray-900 bg-gray-50/50 font-medium"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !frustration.trim()}
                      className="w-full py-4 bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white font-bold rounded-xl hover:scale-[1.02] transition-all text-sm shadow-lg shadow-[#1D4ED8]/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Submitting feedback...</span>
                      ) : (
                        <>
                          <span>Submit & Skip Queue</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => router.push('/')}
                      className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Home className="w-4 h-4" />
                      <span>Skip & Go Home</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="feedback-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-6"
              >
                <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-extrabold text-[#102970] tracking-tight font-display">
                    Feedback Received!
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed font-semibold">
                    Thank you for sharing your thoughts. We've prioritized your request and will reach out shortly to help you skip the queue.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/"
                    className="inline-flex w-full py-4 bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white font-bold rounded-xl items-center justify-center gap-2 transition-all text-sm shadow-lg shadow-[#1D4ED8]/25 font-sans"
                  >
                    <Home className="w-4 h-4" />
                    <span>Return to Homepage</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400 font-medium">
        <p>© {new Date().getFullYear()} Alpine grow. All rights reserved.</p>
        <p className="text-gray-400 text-[10px] mt-1">Made with ❤️ in India</p>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-gray-500">Loading details...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
