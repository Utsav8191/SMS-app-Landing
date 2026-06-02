'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200/80 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center py-4 text-left font-bold text-lg text-on-surface hover:text-primary transition-colors focus:outline-none"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-on-surface-variant text-base leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: 'What is the implementation time for the School Management System?',
      answer: 'Typically, initial setup takes less than a week. We assist with migrating your current student records, fee categories, and staff lists. Standard onboarding, including training sessions for your administrators and teachers, is fully completed within 7 to 10 days.'
    },
    {
      question: 'Is student and administrative data secure on your cloud platform?',
      answer: 'Yes, data security is our highest priority. We use bank-grade end-to-end encryption protocols, secure socket layers (SSL), and hosting infrastructure with automated real-time backups to ensure that all personal, academic, and financial information remains confidential and secure.'
    },
    {
      question: 'Are there dedicated mobile applications for parents and teachers?',
      answer: 'Yes. We provide native mobile applications for iOS and Android tailored specifically for parents to track attendance, fees, homework, and reports, and another app for teachers to record class schedules, marks, and attendance on-the-go.'
    },
    {
      question: 'What type of training and support do you provide during onboarding?',
      answer: 'We provide extensive, live training sessions for administrators, teachers, and coordinators. In addition, every school is assigned a dedicated support manager available via chat, email, or phone to address any operational queries post-launch.'
    },
    {
      question: 'Does the system support online fee collection and invoice generation?',
      answer: 'Yes. The system integrates seamlessly with leading payment gateways, allowing parents to securely pay fees online using credit cards, net banking, UPI, or digital wallets. Invoices are generated automatically, and system reminders alert parents before deadline dates.'
    },
    {
      question: 'Can the system accommodate multiple school branches or campuses?',
      answer: 'Absolutely. EdFlow Pro is built to be highly scalable. It supports multi-campus trusts or single-campus schools alike, enabling unified reports, centralized billing, and top-level governance from a single administrative account.'
    }
  ];

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
            Everything you need to know about setting up and running our administrative platform in your institution.
          </p>
        </div>
        <div className="bg-background-alt p-6 md:p-10 rounded-3xl border border-gray-100">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
