'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  School,
  Calendar
} from 'lucide-react';
import Script from 'next/script';
import { createRazorpaySubscriptionAction, checkSubscriptionEligibilityAction } from '@/actions/createCheckout';

export default function PricingPage() {
  const [schoolName, setSchoolName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const handleEmailBlur = async () => {
    if (!ownerEmail) return;
    const normalizedEmail = ownerEmail.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) return;

    try {
      const res = await checkSubscriptionEligibilityAction({ email: normalizedEmail });
      if (res.success && res.isReturningCustomer !== undefined) {
        setIsReturningCustomer(res.isReturningCustomer);
      }
    } catch (err) {
      console.error("Failed to check subscription eligibility:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const normalizedEmail = ownerEmail.trim().toLowerCase();

    if (!schoolName.trim() || !normalizedEmail || !ownerPhone.trim()) {
      setErrorMessage("Please fill out all fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await createRazorpaySubscriptionAction({
        schoolName,
        ownerEmail: normalizedEmail,
        ownerPhone,
      });

      if (response.success && response.subscriptionId && response.keyId) {
        // Initialize Razorpay Checkout
        const options = {
          key: response.keyId,
          subscription_id: response.subscriptionId,
          name: "Alpine grow",
          description: isReturningCustomer
            ? "Annual Enterprise Plan - Immediate Activation"
            : "Annual Enterprise Plan - 30-Day Free Trial",
          handler: function (paymentResponse: any) {
            // Redirect to onboarding success page with subscription ID
            window.location.href = `/pricing/success?session_id=${paymentResponse.razorpay_subscription_id || response.subscriptionId}`;
          },
          prefill: {
            name: `${schoolName} Owner`,
            email: ownerEmail,
            contact: ownerPhone,
          },
          notes: {
            schoolName,
            ownerEmail,
            ownerPhone,
          },
          theme: {
            color: "#1D4ED8",
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        setErrorMessage(response.message || "Failed to initiate Razorpay subscription");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const planFeatures = [
    "AI Command Copilot Hub",
    "Online Admissions & Document Vault",
    "Student & Staff 360 Profiles",
    "Secure Online Fee Payout Gateways",
    "Automated WhatsApp & Email Notifications",
    "24/7 Priority Setup & Local Support",
    "Web-Based access with 99.9% Uptime SLA",
    "End-to-End Database Isolation & Encryption"
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans flex flex-col justify-between">
      {/* Load Razorpay Checkout SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Sticky Navigation Header */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm h-16">
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center h-full">
          <a href="/" className="font-sans font-extrabold text-2xl text-[#1D4ED8] tracking-tight">
            Alpine grow
          </a>
          <div>
            <a
              href="/"
              className="text-sm font-semibold text-gray-600 hover:text-[#1D4ED8] transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Main Pricing Hero & Content */}
      <main className="flex-grow py-16 px-6 md:px-20 relative overflow-hidden flex items-center justify-center">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#1D4ED8]/5 blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#F59E0B]/5 blur-3xl -z-10" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Product Pitch & Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 py-1 px-4 bg-[#1D4ED8]/10 text-[#1D4ED8] font-bold rounded-full text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                India Subscription Plans
              </span>
              <h1 className="font-sans text-4xl md:text-5xl font-extrabold text-[#102970] leading-tight tracking-tight">
                Simple, Value-Driven Pricing for Modern Schools
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Get full access to all tools, dashboards, and automated modules. Start managing admissions, fees, and staff with absolute control.
              </p>
            </div>

            {/* Trial Info Highlight Badge */}
            <div className={`border-l-4 p-5 rounded-r-2xl shadow-sm max-w-lg transition-colors duration-300 ${
              isReturningCustomer ? "bg-blue-50/50 border-[#1D4ED8]" : "bg-white border-[#F59E0B]"
            }`}>
              <div className="flex gap-3 items-start">
                <Calendar className={`w-5 h-5 shrink-0 mt-0.5 ${isReturningCustomer ? "text-[#1D4ED8]" : "text-[#F59E0B]"}`} />
                <div>
                  <h4 className="font-bold text-[#102970] text-sm">
                    {isReturningCustomer ? "Reactivate Workspace Upfront" : "Mandatory 30-Day Free Trial"}
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                    {isReturningCustomer
                      ? "Your email is associated with an existing workspace. Paying upfront will immediately restore your full workspace access, preserving all your data."
                      : "An e-Mandate / Standing Instruction setup is required to secure your workspace. You will not be charged today. Cancel anytime within 30 days to avoid charges."}
                  </p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl pt-2">
              {planFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 text-sm font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Subscription Form Card */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full bg-white rounded-[24px] shadow-2xl border border-gray-200/80 p-8 md:p-10 flex flex-col justify-between"
            >
              {/* Plan Header */}
              <div className="text-left space-y-2 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between items-start">
                  <span className="bg-[#102970] text-white text-xs font-bold uppercase py-1 px-3 rounded-md">
                    ALL-IN-ONE
                  </span>
                  <div className="text-right">
                    <span className="text-gray-400 text-xs line-through block">₹29,999</span>
                    <span className="text-2xl md:text-3xl font-extrabold text-[#1D4ED8] font-mono">₹19,999</span>
                    <span className="text-gray-500 text-xs">/year</span>
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-[#102970]">Annual Enterprise Plan</h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {isReturningCustomer
                    ? "Immediate billing activation. Safe, secure automated workspace setup."
                    : "Includes 30 days of free trialing. Safe, secure automated workspace setup."}
                </p>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* School Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="schoolName" className="font-bold text-xs text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <School className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    School Name
                  </label>
                  <input
                    id="schoolName"
                    type="text"
                    required
                    placeholder="e.g. Greenwood Academy"
                    disabled={isSubmitting}
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#1D4ED8]/20 outline-none focus:border-[#1D4ED8] transition-all text-sm text-gray-900 bg-gray-50/50 font-medium"
                  />
                </div>

                {/* Owner Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ownerEmail" className="font-bold text-xs text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    Owner / Admin Email
                  </label>
                  <input
                    id="ownerEmail"
                    type="email"
                    required
                    placeholder="admin@school.edu"
                    disabled={isSubmitting}
                    value={ownerEmail}
                    onBlur={handleEmailBlur}
                    onChange={(e) => {
                      setOwnerEmail(e.target.value);
                      if (isReturningCustomer) {
                        setIsReturningCustomer(false);
                      }
                    }}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#1D4ED8]/20 outline-none focus:border-[#1D4ED8] transition-all text-sm text-gray-900 bg-gray-50/50 font-medium"
                  />
                </div>

                {/* Owner Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="ownerPhone" className="font-bold text-xs text-gray-700 uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    Owner Phone Number
                  </label>
                  <input
                    id="ownerPhone"
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    disabled={isSubmitting}
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-[#1D4ED8]/20 outline-none focus:border-[#1D4ED8] transition-all text-sm text-gray-900 bg-gray-50/50 font-medium"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-4 bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white font-bold rounded-xl hover:scale-[1.02] transition-all text-sm shadow-lg shadow-[#1D4ED8]/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 disabled:hover:bg-[#1D4ED8]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Connecting to billing...</span>
                    </div>
                  ) : (
                    <>
                      <span>{isReturningCustomer ? "Pay Upfront to Activate Workspace" : "Start 30-Day Free Trial"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Secure Badges */}
              <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 text-[10px] font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Razorpay Secure
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  256-bit SSL
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Pricing Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-500 font-semibold">
        <p>© {new Date().getFullYear()} Alpine grow. Secured billing via Razorpay. All rights reserved.</p>
        <p className="text-gray-400 text-[10px] mt-1">Made with ❤️ in India</p>
      </footer>
    </div>
  );
}
