'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { submitWaitlistRequest } from '@/actions/submitWaitlist';
import { waitlistFormSchema, studentStrengths } from '@/schemas/waitlist';
import type { WaitlistFormValues } from '@/schemas/waitlist';
import { sendGAEvent } from '@next/third-parties/google';

export default function WaitlistForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema) as any,
    defaultValues: {
      emailAddress: '',
      schoolName: '',
      studentStrength: '',
    } as unknown as WaitlistFormValues,
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await submitWaitlistRequest(data);
      if (response.success) {
        // Trigger GA4 custom event on successful waitlist submission
        sendGAEvent('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'landing_page_waitlist',
        });

        const row = response.rowNumber || 2;
        router.push(`/waitlist/success?row=${row}`);
      } else {
        setSubmitResult({
          success: false,
          message: response.message || 'Validation failed. Please verify the fields.',
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        message: 'An unexpected system error occurred. Please try again.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background-alt relative overflow-hidden" id="waitlist">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-gold/5 blur-3xl -z-10" />

      <div className="max-w-3xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
            JOIN THE WAITLIST
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
            Be the First to Experience Alpine grow
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-xl mx-auto text-base">
            We are rolling out priority access in batches. Submit your details below to secure your spot in line.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-200/80 p-8 md:p-10 relative">
          <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
            {/* Form General Error Alert */}
            {submitResult && !submitResult.success && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Submission Failed</h4>
                  <p className="text-sm mt-0.5">{submitResult.message}</p>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {/* School Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="schoolName" className="font-bold text-sm text-on-surface">
                  School Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="schoolName"
                  type="text"
                  placeholder="e.g. Green Valley Public School"
                  disabled={isSubmitting}
                  {...register('schoolName')}
                  className={`px-4 py-3 rounded-xl border ${
                    errors.schoolName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                  } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                />
                {errors.schoolName && (
                  <span className="text-xs text-red-500 mt-1">{errors.schoolName.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="emailAddress" className="font-bold text-sm text-on-surface">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  placeholder="e.g. administrator@school.com"
                  disabled={isSubmitting}
                  {...register('emailAddress')}
                  className={`px-4 py-3 rounded-xl border ${
                    errors.emailAddress ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                  } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                />
                {errors.emailAddress && (
                  <span className="text-xs text-red-500 mt-1">{errors.emailAddress.message}</span>
                )}
              </div>

              {/* Number of Students */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="studentStrength" className="font-bold text-sm text-on-surface">
                  Number of Students <span className="text-red-500">*</span>
                </label>
                <select
                  id="studentStrength"
                  disabled={isSubmitting}
                  {...register('studentStrength')}
                  className={`px-4 py-3 rounded-xl border ${
                    errors.studentStrength ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                  } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                >
                  <option value="">Select Student Range</option>
                  {studentStrengths.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.studentStrength && (
                  <span className="text-xs text-red-500 mt-1">{errors.studentStrength.message}</span>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-10 py-4 bg-[#1D4ED8] text-white font-bold rounded-xl hover:bg-secondary hover:scale-105 transition-all text-base shadow-xl disabled:opacity-50 disabled:scale-100 disabled:hover:bg-[#1D4ED8] cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Joining Waitlist...</span>
                  </div>
                ) : (
                  'Join the Waitlist'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
