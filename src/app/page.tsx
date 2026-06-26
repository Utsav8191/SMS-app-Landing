'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Wallet,
  CheckCircle,
  MessageSquare,
  Smartphone,
  Star,
  GraduationCap,
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
  Bus,
  UserCheck,
  SmartphoneNfc
} from 'lucide-react';

import WaitlistForm from '@/components/WaitlistForm';
import DashboardShowcase from '@/components/DashboardShowcase';
import FAQ from '@/components/FAQ';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: 'AI Command Copilot',
      description: 'Intelligent, search-driven navigation hub accessible instantly from anywhere in the application.'
    },
    {
      icon: <Layers className="w-6 h-6 text-primary" />,
      title: 'Online Admissions',
      description: 'Digitize the entire enrollment process from dynamic online forms to automated verification and registration fee payouts.'
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: 'Student Profiles',
      description: 'Comprehensive 360-degree view of academic histories, marks, health logs, fee books, and extracurricular performance.'
    },
    // {
    //   icon: <CheckCircle className="w-6 h-6 text-primary" />,
    //   title: 'Smart Attendance',
    //   description: 'Mark attendance via RFID sensors or mobile apps, triggering instant absent updates to parents via SMS and push.'
    // },
    {
      icon: <Wallet className="w-6 h-6 text-primary" />,
      title: 'Fee Management',
      description: 'Collect payments online via secure gateways. Auto-schedule due alerts, handle partial payments, and issue receipts.'
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: 'Announcements',
      description: 'Broadcasting tools for circulars, dynamic newsletters, notice board posts, and automated SMS alerts.'
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: 'Staff Administration',
      description: 'Centralize payroll computations, log teacher lesson plans, assign classes, and record leave balances.'
    },
    // {
    //   icon: <SmartphoneNfc className="w-6 h-6 text-primary" />,
    //   title: 'Parent Portal',
    //   description: 'Ensure absolute transparency. Empower parents with real-time fee books, homework diaries, and instant report cards.'
    // },
    // {
    //   icon: <Smartphone className="w-6 h-6 text-primary" />,
    //   title: 'Dedicated Mobile Apps',
    //   description: 'Beautiful, native iOS and Android applications designed individually for school administrators, teachers, and parents.'
    // }
  ];

  const problemSolutions = [
    {
      tag: 'ADMINISTRATION',
      probTitle: 'Manual Records & Broken Workflows',
      probDesc: 'Scattered paper registries and outdated Excel files make searching for past records, academic histories, or health logs extremely exhausting for administrative staff.',
      solTitle: 'Centralized Cloud Repository',
      solDesc: 'A secure and structured cloud platform housing everything from online admissions to alumni databases, accessible within a single click from any device.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZQRO6fJFiyOPSpuX4yBidxgHzazqnSMR4giGseCE8LjL5wmYB116HeWSAmNRvXghfSSlGHjZl8GWZlmImVzRb56n-ZKoSw2NU6TTboxOpt2msJIBYAEv5xu4OU3xjpDaqhvpqFe3eQpaxeSBpYjkbO0gg1CSCuDne0KhbjVi8RF26BAyWFIoSy3pSPetNmNAnUOxKlSzFyQZTfdNlp1oG1gZtbtUG1_KKjcqxfvaQRl8AXoe9Df2VLQGXAPJLacgQxjOXepm6fG68',
      imageAlt: 'Scattered manual paper logs contrast with digital workflows'
    },
    {
      tag: 'ENGAGEMENT',
      probTitle: 'The Parent-Teacher Communication Gap',
      probDesc: 'Crucial attendance warnings, exam dates, fee updates, and classroom notices go unnoticed, leading to misunderstandings and delayed responses.',
      solTitle: 'Real-time Automated Channels',
      solDesc: 'Instant, transparent notification updates sent straight to parents via WhatsApp or email.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHdpJ0fWl1O_r_Hpw_WBS8e-8duTMyduUv25V3Nvj-IyzJp4cLEJRsf0GXlnEzdB0o3jc7jEjkJvNvv4N5CBNOHEM9DfyOwi3pG7pKe19NRm30D2JLVhjrF8ttK5LRGitPyyguAtltI3vA3MYb9aIrlligF54NCCxKeoE8J-z6FdiweDPAqYNpkpY9lPhuz2hdaP38pjWGBUxMVmCZjrL-uRQiyAF81IOuocJkQ0OoJxu4iAREfssuWWnzoum9iJuVeSnuJ4GbUdzp',
      imageAlt: 'Busy parents keeping in sync via automated school portal applications'
    },
    {
      tag: 'BLOATED SOFTWARE',
      probTitle: "Stop Paying for Features You Don't Use",
      probDesc: 'Most school ERPs are packed with modules that add cost, complexity, and training overhead. Schools end up navigating clutter instead of focusing on daily operations.',
      solTitle: 'Essential Tools. Nothing Extra.',
      solDesc: 'Powerful dashboards, AI-powered commands, operational management, seamless data migration, and complete staff activity tracking—everything schools need, without unnecessary modules.',
      gif: '/assets/Stress.gif',
      imageAlt: 'Why pay for features you wont use'
    },
    {
      tag: 'DATA MIGRATION CHALLENGE',
      probTitle: "Migrating Your School Data Shouldn't Take Weeks",
      probDesc: 'Moving student, staff, and academic records into a new ERP is often a complex, time-consuming process. Cluttered interfaces and technical workflows make data migration difficult for everyday school users.',
      solTitle: 'Simple, Guided Data Migration',
      solDesc: 'Import students, staff, subjects, and more through intuitive workflows built directly into the platform. No technical expertise required—just a seamless migration experience designed for school administrators.',
      image: '/assets/At work-cuate.png',
      imageAlt: 'Why pay for features you wont use'
    }
  ];

  const differentiators = [
    {
      title: 'Unmatched Reliability',
      description: 'Our platform maintains a 99.9% operational uptime with enterprise SLA metrics, backed by fail-safe server architecture.'
    },
    {
      title: 'Incredibly Easy to Use',
      description: 'No technical expertise required. A beautifully clean, minimal design system ensures staff are fully operational from day one.'
    },
    {
      title: 'Built to Scale',
      description: 'EdFlow Pro easily scales with your growth, accommodating from 100 students up to 15,000+ multi-campus networks.'
    },
    {
      title: 'Dedicated Local Support',
      description: 'Receive 24/7 technical support, personalized setup assistants, and direct, hands-on training sessions for your staff.'
    },
    {
      title: 'Absolute Privacy & Encryption',
      description: 'Complete data isolation with end-to-end HTTPS encryption, custom access roles, and continuous security audits.'
    },
    {
      title: 'Web Based',
      description: 'EdFlow Pro is a web-based platform. That means you can access it from any web browser without need to install anything separate.'
    }
  ];

  const outcomes = [
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      value: '40% Less',
      title: 'Administrative Workload',
      description: 'Automate admissions, daily records, attendance tracking, and monthly circular broadcasts.'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      value: '90% Increase',
      title: 'Parent Engagement',
      description: 'Provide instant portal notifications and reminders, directly into parents Whatsapp & Email.'
    },
    {
      icon: <Layers className="w-8 h-8 text-primary" />,
      value: '100% Unified',
      title: 'School Operations',
      description: 'Consolidate multiple separate modules into a single, cohesive platform.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      value: '30% Cost Savings',
      title: 'Reduced Overheads',
      description: 'Cut down on extensive paperwork, administrative billing errors, and SMS gateway overheads.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm h-16' : 'bg-transparent h-20'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-20 flex justify-between items-center h-full">
          <a href="#" className="font-display font-extrabold text-2xl text-primary tracking-tight">
            Alpine Grow
          </a>
          <div className="hidden md:flex items-center gap-8 font-semibold">
            <a href="#features" className="text-on-surface-variant hover:text-primary transition-colors">
              Features
            </a>
            {/* Hiding Pricing temporarily as requested */}
            {/* <a href="/pricing" className="text-on-surface-variant hover:text-[#1D4ED8] transition-colors">
              Pricing
            </a> */}
            <a href="#showcase" className="text-on-surface-variant hover:text-primary transition-colors">
              Live Showcase
            </a>
            <a href="#why-choose-us" className="text-on-surface-variant hover:text-primary transition-colors">
              Why Us
            </a>
            <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors">
              FAQ
            </a>
          </div>
          {/* Hiding Start Free Trial temporarily as requested */}
          {/* <div>
            <a
              href="/pricing"
              className="bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 shadow-md shadow-primary/20 inline-block"
            >
              Start Free Trial
            </a>
          </div> */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[85vh] pt-32 pb-20 hero-gradient relative overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10 text-left space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              All-In-One Enterprise Platform
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight tracking-tight">
              Modern School Management for Growing Institutions
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl font-medium leading-relaxed">
              Seamlessly manage admissions, academics, and fee collection with our cloud-based platform. Built for the next generation of educators and administrators.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {/* Hiding Start 30-Day Free Trial and Book a Demo temporarily as requested */}
              {/* <a
                href="/pricing"
                className="bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white px-8 py-4 rounded-xl font-bold text-base hover:scale-[1.03] transition-all shadow-lg hover:shadow-primary/30"
              >
                Start 30-Day Free Trial
              </a>
              <a
                href="#demo"
                className="border-2 border-outline-variant hover:bg-outline-variant/10 text-on-surface-variant px-8 py-4 rounded-xl font-bold text-base transition-all"
              >
                Book a Demo
              </a> */}
              <a
                href="#waitlist"
                className="bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white px-8 py-4 rounded-xl font-bold text-base hover:scale-[1.03] transition-all shadow-lg hover:shadow-primary/30"
              >
                Join the Waitlist
              </a>
            </div>
          </motion.div>

          {/* Interactive Hero Screenshot Mockup with Floating Glass Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[420px] md:h-[500px] flex items-center justify-center"
          >
            <div className="w-full max-w-md md:max-w-lg bg-transparent relative">
              <img
                className="w-full h-auto object-contain opacity-95"
                src="/assets/heroSection.png"
                alt="Modern interactive dashboard showcase representing administrative performance"
              />

              {/* Floating Glass Card 1 */}
              <div className="absolute -top-3 -left-6 glass-card p-4 rounded-2xl shadow-xl floating z-20" style={{ animationDelay: '0s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-on-surface">Student Profiles</p>
                    <p className="text-[10px] text-on-surface-variant">2,400+ Active</p>
                  </div>
                </div>
              </div>

              {/* Floating Glass Card 2 */}
              <div className="absolute top-1/3 -right-8 glass-card p-4 rounded-2xl shadow-xl floating z-20" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-on-surface">Fee Collection</p>
                    <p className="text-[10px] text-on-surface-variant">98% Success Rate</p>
                  </div>
                </div>
              </div>

              {/* Floating Glass Card 3 */}
              <div className="absolute -bottom-4 left-1/6 glass-card p-4 rounded-2xl shadow-xl floating z-20" style={{ animationDelay: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7f2500]/10 flex items-center justify-center text-[#7f2500]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold text-on-surface">AI Command Center</p>
                    <p className="text-[10px] text-on-surface-variant">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-accent-gold">10+</h3>
              <p className="text-xs md:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Schools Trust Us</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-accent-gold">25,000+</h3>
              <p className="text-xs md:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Students Enrolled</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-accent-gold">1M+</h3>
              <p className="text-xs md:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Attendance Logs</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-3xl md:text-4xl text-accent-gold">$5M+</h3>
              <p className="text-xs md:text-sm font-bold text-on-surface-variant uppercase tracking-wider">Fees Processed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-24 bg-background-alt space-y-16">
        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
          <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
            BRIDGING THE GAPS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
            Simple. Focused. Built on Feedback.
          </h2>
          <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
            No clutter. No hype. Just essential tools your school needs- continuously improved based on your feedback.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-20 space-y-12">
          {problemSolutions.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-3xl border border-gray-200/50 shadow-sm"
            >
              <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="text-xs font-bold text-red-500 tracking-wider mb-2 block uppercase">{item.tag} CHALLENGE</span>
                <h3 className="text-xl md:text-2xl font-bold text-on-surface font-headline-md mb-4">{item.probTitle}</h3>
                <p className="text-on-surface-variant text-base leading-relaxed mb-6">{item.probDesc}</p>

                <div className="p-5 bg-green-50/50 border-l-4 border-green-500 rounded-r-2xl">
                  <span className="text-xs font-bold text-green-700 tracking-wider mb-1 block uppercase">THE EDFLOW PRO ADVANTAGE</span>
                  <h4 className="font-bold text-on-surface text-sm mb-1">{item.solTitle}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.solDesc}</p>
                </div>
              </div>
              <div className={`rounded-2xl overflow-hidden max-h-[350px] flex items-center justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                {item.gif ? (
                  <img src={item.gif} alt={item.imageAlt} className="w-full h-full object-contain" />
                ) : (
                  <img src={item.image} alt={item.imageAlt} className="w-full h-full object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-24 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
              One Single Platform, Total Operational Control
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
              Say goodbye to juggling multiple separate tools. Explore the 10 core components engineered for modern, digital-first schools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-background rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1.5 transition-all group duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Showcase Tab Component */}
      <DashboardShowcase />

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
              BENEFITS & OUTCOMES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
              Measurable Success for Your Institution
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
              See the exact operational and financial gains that single-campus and multi-school networks experience when migrating.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {outcomes.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-background-alt border border-gray-200/50 rounded-3xl text-center flex flex-col items-center gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-extrabold text-primary font-display block">{item.value}</span>
                  <h3 className="text-base font-bold text-on-surface">{item.title}</h3>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background-alt" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
              OUR DIFFERENTIATORS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
              Engineered Differently from Legacy ERPs
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-base">
              We focus on premium design, extreme reliability, and bulletproof user onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                <h3 className="text-lg font-bold text-on-surface mb-3">{diff.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 bg-primary/10 text-primary font-bold rounded-full text-xs mb-4 uppercase tracking-wider">
              TRUSTED BY PRINCIPALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface font-headline-lg">
              Recommended by Leading School Administrators
            </h2>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-6 snap-x no-scrollbar">
            {/* Card 1 */}
            <div className="min-w-[320px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-200/50 snap-center flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-accent-gold gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-on-surface-variant text-base italic leading-relaxed">
                  &ldquo;EduFlow Pro transformed our administrative operations. The fee collection module alone saved us 40 hours of manual Excel entry every single month.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBEgloi9e4JCc-647JQsJOJUyxazSR1pUWCXTibO2_o71gfusDNGAt6w4ThcmSOItjVD3WOUbR7fznHDOH2yUbDnSiWzclBDZeylh6V7PhUDQm1Bo6eLYAORS099OgGCmsBZx8xnKJ05lZX1mGpLCVPbzH-qRk862gAgDKR_cJCbL0giWpBy2gBI_Da5XULkxWiS4vx7uL2-9NDnvZ2UL_qw8HFc_eu1LC_SWiSnoHRekPxDyzx0YHtqpdBSdncm834amhOo4g5mtw"
                  alt="Principal Sarah Jenkins"
                />
                <div className="text-left">
                  <p className="font-bold text-on-surface text-sm">Sarah Jenkins</p>
                  <p className="text-xs text-on-surface-variant font-medium">Principal, Oakwood International</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[320px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-200/50 snap-center flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-accent-gold gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-on-surface-variant text-base italic leading-relaxed">
                  &ldquo;The parent portal application has improved parent-teacher communications immensely. Absentee warnings and test results publish instantly.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMU0lmvFjESId-WQwAzuiXiIswUCWhf4ly_K89ur5SsJCeMEpdUKntFUSbvy1w9GG_M0iK7K_0LnHaQEvGkf8aEEXzp1TckJMckMPJN5lftmsuPV-rIv83wZgM5BolmsbPrps4BLe6GSUblKjFpkbaPT9gT_W8OG0Cq2ACd6zzH8-jEXdpHe5j110IxxAnaNb9jHnRX7oy93RACyoFwwjCR5vaKy4KiJtr5oU7G3npStNpto3SBe5DFDoLNm2BFz93TGGFiupCXp2u"
                  alt="Director David Chen"
                />
                <div className="text-left">
                  <p className="font-bold text-on-surface text-sm">David Chen</p>
                  <p className="text-xs text-on-surface-variant font-medium">Director, Horizon Academics</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="min-w-[320px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-sm border border-gray-200/50 snap-center flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex text-accent-gold gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <p className="text-on-surface-variant text-base italic leading-relaxed">
                  &ldquo;Migrating to EdFlow Pro was the absolute best decision for our administrative staff. Our data was safely moved within a weekend. Outstanding support!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz-Djd_V2vveRLpNr71xCW5tlIEJZYvwvMMh8Bv2pTtg6SHNKmg_EDfhriYbXWroLO7wskzWjXENJ_Jfs-uhWJiLo6LdbzfHf4ASEAKr0xen-9JN-n4YXXEZzmPsBR0k42T6kCGrzFnL_mRHFG1X7QGQsMtt9Y1CC6P5DyjKQIfn3ZgdneFPN4xiHJB7H3G99Wpz15nzQhkyjO49BoI-6mIWeAaH1-9mQPBSex5RSP5e8W8zsWf7UekemTOg04JTmZ9POC-sB8hGoQ"
                  alt="Head Admin Emily Rodriguez"
                />
                <div className="text-left">
                  <p className="font-bold text-on-surface text-sm">Emily Rodriguez</p>
                  <p className="text-xs text-on-surface-variant font-medium">Head Administrator, Global Scholars Group</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiding Book a Demo Form section temporarily and replacing it with Waitlist Form */}
      {/* <DemoForm /> */}
      <WaitlistForm />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA Block */}
      <section className="py-24 bg-product-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center relative z-10 space-y-8 font-display">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to Digitize Your School?</h2>
          <p className="text-white/80 text-lg md:text-xl max-w-xl mx-auto font-medium leading-relaxed font-body">
            Join the forward-thinking institutions leading the digital revolution in education. Sign up for our waitlist today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            {/* Hiding Start Free Trial and Book a Demo temporarily */}
            {/* <a
              href="/pricing"
              className="bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white px-10 py-5 rounded-xl font-bold text-base hover:scale-105 transition-all shadow-xl"
            >
              Start Free Trial
            </a>
            <a
              href="#demo"
              className="border border-white/20 hover:bg-white/10 text-white px-10 py-5 rounded-xl font-bold text-base transition-all"
            >
              Book a Demo
            </a> */}
            <a
              href="#waitlist"
              className="bg-[#1D4ED8] hover:bg-[#1B3A8A] text-white px-10 py-5 rounded-xl font-bold text-base hover:scale-105 transition-all shadow-xl"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-outline-variant/30 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xl text-primary tracking-tight">EduFlow Pro</h3>
            <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
              © {new Date().getFullYear()} EduFlow Pro. All rights reserved.
            </p>
            <p className="text-on-surface-variant text-xs max-w-sm">
              Transforming administration through secure, high-converting digital portals built for Single Campus and Multi-Campus schools.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-on-surface tracking-wider uppercase">Product Links</h4>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                {/* Hiding Pricing & Plans temporarily */}
                {/* <li><a href="/pricing" className="hover:text-primary transition-colors">Pricing & Plans</a></li> */}
                <li><a href="#features" className="hover:text-primary transition-colors">Key Modules</a></li>
                <li><a href="#showcase" className="hover:text-primary transition-colors">Screen Showcase</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-extrabold text-sm text-on-surface tracking-wider uppercase">Contact & Help</h4>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li><a href="#faq" className="hover:text-primary transition-colors">Support FAQ</a></li>
                {/* Hiding Request a Demo temporarily, replacing with Waitlist */}
                {/* <li><a href="#demo" className="hover:text-primary transition-colors">Request a Demo</a></li> */}
                <li><a href="#waitlist" className="hover:text-primary transition-colors">Join the Waitlist</a></li>
                <li><a href="mailto:support@edflowpro.com" className="hover:text-primary transition-colors font-semibold">support@edflowpro.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
