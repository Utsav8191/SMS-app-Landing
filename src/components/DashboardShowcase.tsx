'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'student' | 'attendance' | 'fees';

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>('student');

  const tabContent = {
    student: {
      title: '360° Student Information Management',
      description: 'Centralized profiles capturing academic history, enrollment files, attendance tracking, grades, parent contact info, and medical logs in one premium, easy-to-use interface.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqNjnwdXfH_FaizDXUbzMDRxdW-y5dU-bvLyU4JnrMyUx0ZSpdenzy2ynuZILAX1xUjd9OAfaW54cdgXviiIK55mT7jC-X3X9mTY7EmBf54t5KUlKNw47qkJiY-Mjg52h-EAnum8jlyvLG6rUGNf32F8KhH2gcbxCF1q_Z66t8llVNDls_yGlrVi6ZkLLPD3HOgB_m2L_H-QVD8nXoUzFZ3GmvwnJkD1axIRwa9Ob63a46F0gfEfFq9pbKpkoJt1U7W7Iq6Laq04sm',
      alt: 'Clean and comprehensive Student Profile view in Alpine grow'
    },
    attendance: {
      title: 'Smart Attendance Tracking & Absentees Alert',
      description: 'Real-time classroom rolls, smart RFID card integrations, and automated notifications that instantly alert parents via SMS and email when a student is absent.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALApgugwEdirxOEfYkZy2DOjtRVSpgeS-txT7bZqpo15NCpO-xBA-y2MboB8VRa9tpyWSAxOaleN0bUlvinCgWKsRsf5h9cQJxkL-fb2h4Qv9FchgyQyWmMKnCxe0ZlX7y9MPE6k9aqjCqJw_uL06z-yj407ipAyruXktbaabZw7ll3N9gXr7yGs8qCSHG3NL6j0EmoNUgRjkQb1iui9By2SrrJqCllOGxYWqjKxZyPzr-7rc_ubqyieJZMxNtR7x1F9p06i9FRb_z',
      alt: 'Analytical and dynamic attendance tracking heatmap dashboard in Alpine grow'
    },
    fees: {
      title: 'Seamless Digital Fee Collection & Invoicing',
      description: 'Online payment gateways, custom invoice schedules, automated late-payment reminders, partial payments support, and detailed school revenue reports.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBammKO-zjwbwZDGdEzH8YxbsUOZNAxmI3bUKdiGUzAONtZKvOVldkR-qV1ORbwyCJwveZ38CQD7z2LbtCD5bi9eTxHNogtHBLcAq6dkBZnJ2Htnc1ETrlAxO-7gMTrf6THVImj7fAqPvnA3Ps2ZfA0k5E4lP04_-aMsODeZ6MESQn31vRd2qIx0QY4i8xAb1zjz_RTDlvrwdFQRvcNuC8jLpwE-uwxBTWqpYkFUa8wtU_5Tu181fdySuwtCc0fXJqK2yF3Xcm6DG0Y',
      alt: 'Financial analytics and transaction registers screen in Alpine grow'
    }
  };

  return (
    <section className="py-24 bg-surface-container-low" id="showcase">
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
            PRODUCT WALKTHROUGH
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
            See the Platform in Action
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
            Get a glimpse of the modern, ultra-responsive dashboard modules engineered to simplify your institutional operations.
          </p>

          {/* Interactive Tabs */}
          <div className="flex justify-center gap-4 md:gap-8 mt-10 border-b border-gray-200">
            {(Object.keys(tabContent) as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-bold text-sm md:text-base transition-all relative ${
                  activeTab === tab
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab === 'student' && 'Student Management'}
                {tab === 'attendance' && 'Smart Attendance'}
                {tab === 'fees' && 'Fee Operations'}

                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panel Content */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-200/80 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
            >
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-2xl font-bold text-on-surface leading-tight font-headline-md">
                  {tabContent[activeTab].title}
                </h3>
                <p className="text-on-surface-variant text-base leading-relaxed">
                  {tabContent[activeTab].description}
                </p>
                <div className="pt-2">
                  <a
                    href="#demo"
                    className="text-primary hover:text-secondary font-bold text-sm inline-flex items-center gap-2 group"
                  >
                    Request demo for this module
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img
                  src={tabContent[activeTab].image}
                  alt={tabContent[activeTab].alt}
                  className="w-full h-auto object-cover object-center max-h-[480px]"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
