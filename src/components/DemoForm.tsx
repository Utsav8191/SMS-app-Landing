'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitDemoRequest } from '@/actions/submitDemo';
import {
  demoFormSchema,
  designations,
  schoolTypes,
  studentStrengths,
  preferredDemoTimes,
} from '@/schemas/demo';
import type { DemoFormValues } from '@/schemas/demo';

export default function DemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    dryRun?: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema) as any,
    defaultValues: {
      schoolName: '',
      contactPerson: '',
      designation: '',
      mobileNumber: '',
      emailAddress: '',
      schoolType: '',
      studentStrength: '',
      existingSoftware: '',
      city: '',
      state: '',
      preferredDemoDate: '',
      preferredDemoTime: '',
      message: '',
    } as unknown as DemoFormValues,
  });

  const onSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await submitDemoRequest(data);
      if (response.success) {
        setSubmitResult({
          success: true,
          message: response.message,
          dryRun: response.dryRun,
        });
        reset(); // Clear all fields on success
      } else {
        setSubmitResult({
          success: false,
          message: response.message || 'Validation failed. Please verify the fields.',
        });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        message: 'An unexpected system error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background-alt relative overflow-hidden" id="demo">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent-gold/5 blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
            BOOK A FREE DEMO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
            Schedule Your Personalized Walkthrough
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
            Discover how EdFlow Pro can digitize daily records, streamline fee collections, and simplify parent engagement for your school.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/80 p-8 md:p-12 relative">
          <AnimatePresence mode="wait">
            {submitResult?.success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-16 space-y-6"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-2">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Request Submitted!</h3>
                <p className="text-gray-600 max-w-lg mx-auto text-lg leading-relaxed">
                  {submitResult.message}
                </p>
                {submitResult.dryRun && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-full mx-auto">
                    <Sparkles className="w-4 h-4" />
                    <span>Demo Mode (Dry Run): Spreadsheet ID is not set yet.</span>
                  </div>
                )}
                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => setSubmitResult(null)}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary hover:scale-105 transition-all text-sm shadow-md"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit(onSubmit as any)}
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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

                  {/* Contact Person */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contactPerson" className="font-bold text-sm text-on-surface">
                      Contact Person Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contactPerson"
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      disabled={isSubmitting}
                      {...register('contactPerson')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.contactPerson ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    />
                    {errors.contactPerson && (
                      <span className="text-xs text-red-500 mt-1">{errors.contactPerson.message}</span>
                    )}
                  </div>

                  {/* Designation */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="designation" className="font-bold text-sm text-on-surface">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="designation"
                      disabled={isSubmitting}
                      {...register('designation')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.designation ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    >
                      <option value="">Select Designation</option>
                      {designations.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.designation && (
                      <span className="text-xs text-red-500 mt-1">{errors.designation.message}</span>
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

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mobileNumber" className="font-bold text-sm text-on-surface">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      placeholder="10-digit mobile number"
                      disabled={isSubmitting}
                      {...register('mobileNumber')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.mobileNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    />
                    {errors.mobileNumber && (
                      <span className="text-xs text-red-500 mt-1">{errors.mobileNumber.message}</span>
                    )}
                  </div>

                  {/* School Type */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="schoolType" className="font-bold text-sm text-on-surface">
                      School Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="schoolType"
                      disabled={isSubmitting}
                      {...register('schoolType')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.schoolType ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    >
                      <option value="">Select School Type</option>
                      {schoolTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.schoolType && (
                      <span className="text-xs text-red-500 mt-1">{errors.schoolType.message}</span>
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

                  {/* Current Software */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="existingSoftware" className="font-bold text-sm text-on-surface">
                      Current Software Used
                    </label>
                    <input
                      id="existingSoftware"
                      type="text"
                      placeholder="e.g. Fedena, Teachmint, Excel, or Manual"
                      disabled={isSubmitting}
                      {...register('existingSoftware')}
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-primary/20 outline-none focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50"
                    />
                  </div>

                  {/* City */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="font-bold text-sm text-on-surface">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="e.g. Mumbai"
                      disabled={isSubmitting}
                      {...register('city')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.city ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    />
                    {errors.city && (
                      <span className="text-xs text-red-500 mt-1">{errors.city.message}</span>
                    )}
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="state" className="font-bold text-sm text-on-surface">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder="e.g. Maharashtra"
                      disabled={isSubmitting}
                      {...register('state')}
                      className={`px-4 py-3 rounded-xl border ${
                        errors.state ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-primary/20'
                      } outline-none focus:ring-4 focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50`}
                    />
                    {errors.state && (
                      <span className="text-xs text-red-500 mt-1">{errors.state.message}</span>
                    )}
                  </div>

                  {/* Preferred Demo Date */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="preferredDemoDate" className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      Preferred Demo Date
                    </label>
                    <input
                      id="preferredDemoDate"
                      type="date"
                      disabled={isSubmitting}
                      {...register('preferredDemoDate')}
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-primary/20 outline-none focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50"
                    />
                  </div>

                  {/* Preferred Demo Time */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="preferredDemoTime" className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      Preferred Demo Time
                    </label>
                    <select
                      id="preferredDemoTime"
                      disabled={isSubmitting}
                      {...register('preferredDemoTime')}
                      className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-primary/20 outline-none focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50"
                    >
                      <option value="">Select Time Slot</option>
                      {preferredDemoTimes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="font-bold text-sm text-on-surface">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about your school's specific requirements."
                    disabled={isSubmitting}
                    {...register('message')}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-primary/20 outline-none focus:border-primary transition-all text-sm text-gray-900 bg-gray-50/50"
                  />
                </div>

                {/* Submit button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-[#1D4ED8] text-white font-bold rounded-xl hover:bg-secondary hover:scale-105 transition-all text-base shadow-xl disabled:opacity-50 disabled:scale-100 disabled:hover:bg-[#1D4ED8]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Request...</span>
                      </div>
                    ) : (
                      'Book a Free Demo'
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
