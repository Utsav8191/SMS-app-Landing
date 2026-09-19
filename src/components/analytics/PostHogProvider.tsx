'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import PostHogPageView from './PostHogPageView';
import ScrollTracker from './ScrollTracker';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    // If key is not configured, warn in development but do not crash
    if (!posthogKey) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          '[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics capture will be disabled until the token is provided.'
        );
      }
      return;
    }

    if (typeof window !== 'undefined' && !posthog.__loaded) {
      posthog.init(posthogKey, {
        // Reverse proxy route configured in next.config.ts to avoid ad-blockers
        api_host: '/ingest',
        ui_host: posthogHost,
        person_profiles: 'identified_only',
        // Manual route changes are captured via PostHogPageView
        capture_pageview: false,
        capture_pageleave: true,
        autocapture: true,
        // Performance & Web Vitals
        capture_performance: true,
        // Feature flags disabled as requested for landing page
        advanced_disable_feature_flags_on_first_load: true,
        // Session Replay with strict input masking
        session_recording: {
          maskAllInputs: true,
          maskInputOptions: {
            password: true,
            email: true,
          },
        },
        // Tag dev events so test traffic does not pollute production reports
        loaded: (ph) => {
          if (process.env.NODE_ENV !== 'production') {
            ph.register({ is_development: true });
          }
        },
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      <ScrollTracker />
      {children}
    </PHProvider>
  );
}
