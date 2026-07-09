'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Home, LogIn } from 'lucide-react';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || 'N/A';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans flex flex-col justify-between relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1D4ED8]/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 blur-3xl -z-10" />

      {/* Navigation Header */}
      <nav className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-20 w-full flex justify-between items-center">
          <Link href="/" className="font-sans font-extrabold text-2xl text-[#1D4ED8] tracking-tight">
            Alpine grow
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full bg-white rounded-[24px] shadow-2xl border border-gray-200/80 p-8 md:p-10 text-center space-y-8"
        >
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Messaging */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-[#102970] tracking-tight leading-tight">
              Subscription Successful!
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed font-semibold">
              Thank you for subscribing to Alpine grow. We have successfully authenticated your e-mandate and initiated your 30-day free trial.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase">Subscription ID</span>
              <span className="text-gray-700 font-mono font-bold">{sessionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase">Mandate Setup</span>
              <span className="text-gray-700 font-bold">₹1.00 (Verification Charge)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-bold uppercase">Trial Period</span>
              <span className="text-green-600 font-bold">30 Days (Free)</span>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-[#1D4ED8] p-4 text-left text-xs rounded-r-lg">
            <p className="text-[#102970] font-semibold leading-relaxed">
              <strong>What's Next?</strong> Your school workspace is being automatically provisioned. You will receive an onboarding email containing your temporary administrator credentials within the next 2-3 minutes.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col gap-3">
            <a
              href="http://localhost:5173/login"
              className="w-full py-4 bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white font-bold rounded-xl hover:scale-[1.02] transition-all text-sm shadow-lg shadow-[#1D4ED8]/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Go to Application Login</span>
            </a>
            
            <Link
              href="/"
              className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
          </div>
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
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-gray-500">Loading subscription details...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
