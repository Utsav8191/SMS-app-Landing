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
      answer: 'Setup is instant. As soon as you complete the auto-pay configuration, your 30-day free trial begins immediately. Your login credentials will be sent to your email instantly, allowing you to access and start using the application right away.'
    },
    {
      question: 'Is student and administrative data secure on your cloud platform?',
      answer: 'Yes, data security is our top priority. All student and administrative records are fully encrypted and transmitted securely. We leverage modern, industry-standard cloud platforms and secure servers with automated real-time backups to ensure your institution\'s data remains safe and confidential at all times.'
    },
    {
      question: 'Are there dedicated mobile applications for parents and teachers?',
      answer: 'Yes. We provide a special web-based PWA (Progressive Web App) portal for Teachers that is optimized to work even at slow internet speeds and supports offline attendance marking. For parents, we provide native iOS and Android mobile apps to track attendance, fees, homework, and reports.'
    },
    {
      question: 'What type of training and support do you provide during onboarding?',
      answer: 'We provide extensive, live training sessions for administrators, teachers, and coordinators. In addition, our support team is easily reachable via chat, email, or phone to address any operational queries post-launch.'
    },
    {
      question: 'Does the system support online fee collection and invoice generation?',
      answer: 'Currently, fee collections can be manually updated in the system, and various school payment methods can be added. Direct online payment gateway integration will be introduced in future updates. However, invoices are automatically generated, and the specific payment modes (such as Cash, UPI, Cheque, or Bank Transfer) can be updated and tracked for each transaction.'
    },
    {
      question: 'Can the system accommodate multiple school branches or campuses?',
      answer: 'Currently, multi-tenant setup for multiple branches or campuses is not supported. However, support for managing multiple campus locations under a unified account is planned for future updates.'
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
