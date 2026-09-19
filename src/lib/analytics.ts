import posthog from 'posthog-js';

/**
 * Safe capture wrapper that checks for client runtime and posthog availability
 */
export function trackEvent(eventName: string, properties: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  try {
    // Only capture if posthog is initialized or in non-production warning
    if (posthog && typeof posthog.capture === 'function') {
      posthog.capture(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[PostHog] Failed to capture event "${eventName}":`, err);
    }
  }
}

/**
 * Track Call To Action button clicks
 */
export function trackCtaClick(buttonText: string, location: string, destinationHref?: string) {
  trackEvent('cta_clicked', {
    button_text: buttonText,
    location,
    destination_href: destinationHref,
  });
}

/**
 * Track Form Submissions (STRICTLY NO PII: no names, emails, phones, or specific school names)
 */
export function trackFormSubmit(
  formName: 'waitlist' | 'demo_request',
  safeMetadata: Record<string, any> = {}
) {
  trackEvent('form_submitted', {
    form_name: formName,
    ...safeMetadata,
  });
}

/**
 * Track Outbound Links (External websites, Social media)
 */
export function trackOutboundLink(url: string, linkText?: string, location?: string) {
  trackEvent('outbound_link_clicked', {
    url,
    link_text: linkText,
    location,
  });
}

/**
 * Track Scroll Depth Milestones (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(depthPercentage: 25 | 50 | 75 | 100) {
  trackEvent('scroll_depth_reached', {
    depth_percentage: depthPercentage,
  });
}

/**
 * Track FAQ item toggles
 */
export function trackFaqToggle(question: string, isExpanded: boolean) {
  trackEvent('faq_toggled', {
    question,
    is_expanded: isExpanded,
  });
}
