'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Clock } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-white to-indigo-50/30 text-on-surface antialiased selection:bg-primary/10">
      
      {/* Navbar header */}
      <header className="max-w-7xl mx-auto px-6 md:px-20 py-6 flex items-center justify-between border-b border-slate-100/80 bg-white/40 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 text-primary group">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <svg
              viewBox="0 0 100 100"
              className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="30" r="10" fill="currentColor" opacity="0.15" />
              <circle cx="50" cy="30" r="5" fill="currentColor" />
              <path
                d="M20 72L42 35L56 56"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
              />
              <path
                d="M42 72L58 45L78 72"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
              />
              <path
                d="M18 72H82"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight text-slate-800">Alpine Grow</span>
        </Link>
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main content container */}
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-16">
        <div className="space-y-10 bg-white p-8 md:p-12 rounded-3xl border border-gray-200/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-indigo-500" />
          
          {/* Header Title */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5" />
              <span>Legal Document</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-display">
              Terms of Service
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Last Updated: July 14, 2026</span>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Terms content */}
          <div className="prose prose-slate max-w-none text-on-surface-variant text-sm md:text-base leading-relaxed space-y-8 font-sans">
            <p className="text-slate-700 font-medium">
              Welcome to our School Management System (&ldquo;Platform&rdquo;, &ldquo;Service&rdquo;), a multi-tenant software-as-a-service (SaaS) utility provided by us (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By accessing or registering an account for our Platform, your educational institution (&ldquo;Institution&rdquo;, &ldquo;Subscriber&rdquo;, &ldquo;User&rdquo;, &ldquo;you&rdquo;) agrees to be bound by these Terms of Service. Please read them carefully.
            </p>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                1. Account Provisioning & Registration
              </h2>
              <p>
                <strong>Institutional Authority:</strong> By registering a school account, you certify that you are an authorized representative (Super Admin, Principal, or Management official) with the legal mandate to bind your Institution to these terms.
              </p>
              <p>
                <strong>Access Scoping:</strong> You are solely responsible for maintaining the confidentiality of your administrative credentials and for all actions, updates, or mutations executed by your internal personnel (ADMIN, ACCOUNTANT, TEACHER).
              </p>
              <p>
                <strong>Data Accuracy:</strong> You agree to provide accurate, up-to-date data during the initialization phase, including valid regulatory identifiers (such as School Registration Numbers, Board Affiliation Codes, or UDISE details).
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                2. Platform Usage & Scope of Service
              </h2>
              <p>
                <strong>SaaS License Grant:</strong> We grant your Institution a limited, non-exclusive, non-transferable, revocable license to access our platform solely for educational administration, data hosting, and student information management.
              </p>
              <p>
                <strong>Data Migration Indemnity:</strong> If your Institution utilizes our integrated structural bulk-data ingestion pipelines (MigrationJob), you acknowledge that the completeness and validation accuracy of the source data rests entirely with you. We are not liable for operational disruptions resulting from malformed data streams imported by your administrators.
              </p>
              <p>
                <strong>Prohibited Conduct:</strong> You agree not to reverse engineer, systematically scrap, or launch automated stress tests against our database cluster, or circumvent tenant isolation protocols boundaries (schoolId).
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                3. Financial Infrastructure & Billing Policy
              </h2>
              <p>
                <strong>Subscription Structure:</strong> Access to the platform is managed via transactional subscription schedules passing through our provisioning infrastructure (SaaSProvisioningQueue). Services alternate through explicit lifecycle cycles (TRIALING, ACTIVE, PAST_DUE, UNPAID).
              </p>
              <p>
                <strong>Payment Processing:</strong> Subscriptions are systematically auto-renewed and billed securely through our authorized payment processors (including Razorpay). Failure to settle outstanding invoices within your grace window will restrict active software access.
              </p>
              <p>
                <strong>Refund Disclaimers:</strong> All subscription licensing dues collected are non-refundable unless stated otherwise inside a distinct Service Level Agreement (SLA).
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                4. Operational Communications (WhatsApp & Email Gateway)
              </h2>
              <p>
                <strong>Tenant-Owned Routing Infrastructure:</strong> Our Platform provides integrated infrastructure enabling schools to link third-party transactional networks (including Meta WhatsApp Business APIs and Custom SMTP Email Gateways).
              </p>
              <p>
                <strong>Compliance & Consent:</strong> Your Institution assumes full legal liability for the content, delivery schedules, and regulatory compliance of all automated parent communication broadcasts (daily_absence_alert, fee_overdue_alert). You must guarantee that explicit opt-in parent consent has been secured before dispatching automated notifications.
              </p>
              <p>
                <strong>Delivery Failures:</strong> We provide a transparent execution ledger (NotificationLog, EmailOutboxLog). However, because external deliverability relies on downstream vendors (Meta, Amazon SES, Mailgun), we disclaim direct liability for missing data packets or communication delivery disruptions.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                5. Security Protocols, Retention, & Data Privacy
              </h2>
              <p>
                <strong>Tenant Data Isolation:</strong> We implement rigid rows-level data isolation keys (schoolId) to safeguard your institution's private student, staff, and payroll files from cross-workspace leaks.
              </p>
              <p>
                <strong>Hosting Compliance:</strong> Your institutional logs are housed in secure cloud centers utilizing modern encryption measures.
              </p>
              <p>
                <strong>Statutory Integrity:</strong> The Institution maintains ownership of all proprietary data objects. We do not sell or monetize student records. We process data strictly to fulfill our role as a software service provider.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                6. Limitation of Liability & Termination
              </h2>
              <p>
                <strong>Platform Availability Disclaimer:</strong> The service is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; blueprint. While we target standard enterprise availability, we do not warrant that software execution will remain permanently uninterrupted or error-free.
              </p>
              <p>
                <strong>Liability Cap:</strong> To the maximum extent permitted by governing laws, our aggregate financial liability for any direct operational claims shall never exceed the total subscription amounts paid to us by your school during the preceding three-month calendar window.
              </p>
              <p>
                <strong>Termination Safeguards:</strong> You may terminate your subscription at any time. Upon termination or sustained payment default (CANCELED), your account access will be locked. We provide a grace period to extract your core data tables before permanent database decommissioning.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
                7. Modifications to These Terms
              </h2>
              <p>
                We reserve the right to modify these operational terms at any time to account for software iterations or shifting legislative compliance mandates. Continued deployment of the application sidebar following any update confirms your voluntary acceptance of the updated terms.
              </p>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 md:px-20 py-8 border-t border-slate-100/80 text-center text-xs text-on-surface-variant font-medium">
        <p>&copy; {new Date().getFullYear()} Alpine Grow. All rights reserved.</p>
      </footer>

    </div>
  );
}
