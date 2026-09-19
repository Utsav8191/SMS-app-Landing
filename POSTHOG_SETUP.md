# PostHog Analytics Setup & Event Catalogue

This document outlines the PostHog analytics integration for the **Alpine Grow** landing website (`alpinegrow.in`), including how it is wired, required environment variables, custom event catalogue, ad-blocker reverse proxy architecture, and instructions for adding new events.

---

## 1. Architecture & Wiring

* **Package**: [`posthog-js`](https://posthog.com/docs/libraries/js) (v1.x)
* **SDK Wrapper**: [`PostHogProvider`](src/components/analytics/PostHogProvider.tsx) mounted globally in [`src/app/layout.tsx`](src/app/layout.tsx).
* **Route & Pageview Capture**: Handled via [`PostHogPageView`](src/components/analytics/PostHogPageView.tsx) wrapped in React `<Suspense>` to listen to Next.js App Router route and search parameter changes (`usePathname`, `useSearchParams`).
* **Scroll Depth Tracking**: Handled via [`ScrollTracker`](src/components/analytics/ScrollTracker.tsx), tracking 25%, 50%, 75%, and 100% vertical depth milestones once per session.
* **Ad-Blocker Reverse Proxy**: Configured via Next.js rewrites in [`next.config.ts`](next.config.ts), mapping `/ingest/*` to PostHog US Cloud assets and ingestion servers.
* **Coexistence**: Google Analytics 4 (`@next/third-parties/google`) remains untouched and fully active in parallel.

---

## 2. Environment Variables

Add the following environment variables to your `.env.local` for local development, and in your production hosting platform settings (e.g., Vercel, Netlify, Cloudflare):

```bash
# PostHog Project Token (starts with phc_...)
NEXT_PUBLIC_POSTHOG_KEY=phc_your_posthog_project_token_here

# PostHog Cloud Host (defaults to US Cloud if omitted)
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

> **Note**:
> If `NEXT_PUBLIC_POSTHOG_KEY` is missing or empty, PostHog safely halts without breaking page rendering or throwing errors in the browser. In development, events are tagged with `is_development: true`.

---

## 3. Reverse Proxy Details

To prevent browser ad-blockers and privacy extensions from blocking analytics beacons, all events flow through a first-party rewrite on your domain:

* **Client `api_host`**: `/ingest`
* **Static Assets**: `/ingest/static/:path*` $\rightarrow$ `https://us-assets.i.posthog.com/static/:path*`
* **Event Ingestion**: `/ingest/:path*` $\rightarrow$ `https://us.i.posthog.com/:path*`
* **`skipTrailingSlashRedirect`**: Set to `true` in `next.config.ts` to accommodate PostHog ingestion payloads.

---

## 4. Custom Events Catalogue

All custom events adhere to a strict `snake_case` naming convention. **No Personally Identifiable Information (PII)** such as personal names, email addresses, phone numbers, or free-text messages are captured in event properties.

| Event Name | Trigger Location | Trigger Condition | Properties Captured |
|---|---|---|---|
| `$pageview` | Global (`PostHogPageView`) | Fired on initial page load and on client-side route changes | `$current_url`, standard UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, etc.) |
| `$pageleave` | Global | Fired when user navigates away or closes tab | Standard PostHog exit properties |
| `cta_clicked` | Hero & Bottom Banner | User clicks primary action buttons | `button_text`: string (e.g. `'Join the Waitlist'`)<br>`location`: string (e.g. `'hero'`, `'bottom_banner'`)<br>`destination_href`: string (e.g. `'#waitlist'`) |
| `form_submitted` | `WaitlistForm.tsx` | User submits the waitlist lead form | `form_name`: `'waitlist'`<br>`student_strength`: string (e.g. `'100-500'`) |
| `form_submitted` | `DemoForm.tsx` | User submits demo request form | `form_name`: `'demo_request'`<br>`designation`: string<br>`school_type`: string<br>`student_strength`: string<br>`city`: string<br>`state`: string |
| `scroll_depth_reached` | `ScrollTracker.tsx` | Page scroll crosses milestone (fired at most once per milestone) | `depth_percentage`: `25` \| `50` \| `75` \| `100` |
| `outbound_link_clicked` | `SocialLinks.tsx` | User clicks an external link or social media profile | `url`: string<br>`link_text`: string (e.g. `'Instagram'`, `'Facebook'`)<br>`location`: `'social_links'` |
| `faq_toggled` | `FAQ.tsx` | User expands or collapses an FAQ accordion item | `question`: string<br>`is_expanded`: boolean |

---

## 5. How to Add a New Event

1. Open [`src/lib/analytics.ts`](src/lib/analytics.ts).
2. Add a new typed helper function using `trackEvent`:
   ```ts
   export function trackFeatureClick(featureName: string) {
     trackEvent('feature_card_clicked', {
       feature_name: featureName,
     });
   }
   ```
3. Import and call the helper in your component's click or interaction handler:
   ```tsx
   import { trackFeatureClick } from '@/lib/analytics';
   
   <button onClick={() => trackFeatureClick('AI Copilot')}>...</button>
   ```

---

## 6. Manual Setup & Deployment Steps

1. **Retrieve Token from PostHog**:
   * Log in to [PostHog](https://us.posthog.com).
   * Navigate to **Project Settings** $\rightarrow$ **Project Variables**.
   * Copy your **Project API Key** (`phc_...`).
2. **Add Environment Variables to Hosting Platform (e.g. Vercel)**:
   * Go to Project Settings $\rightarrow$ **Environment Variables**.
   * Add `NEXT_PUBLIC_POSTHOG_KEY = phc_...`.
   * Add `NEXT_PUBLIC_POSTHOG_HOST = https://us.i.posthog.com`.
3. **Deploy the Branch**:
   * Merge `feature/posthog-integration` into your deployment branch (or trigger a preview deployment).
4. **PostHog Dashboard Configuration**:
   * In PostHog, go to **Authorized Domains** and ensure `https://alpinegrow.in` (and any preview domains) are whitelisted for Session Replay.
   * Verify events under the **Activity / Live events** stream in PostHog.

---

## 7. Recommended PostHog Funnels & Insights to Create

1. **Conversion Funnel: Visitor to Waitlist / Demo**:
   * **Step 1**: `$pageview` (where `$current_url` contains `alpinegrow.in`)
   * **Step 2**: `cta_clicked` (e.g. `button_text = 'Join the Waitlist'`)
   * **Step 3**: `form_submitted` (where `form_name = 'waitlist'`)
2. **Engagement Depth Breakdown**:
   * Breakdown of `scroll_depth_reached` events grouped by `depth_percentage` to observe content drop-off.
3. **Traffic Acquisition by Channel**:
   * Insights query tracking `$pageview` segmented by `utm_source`, `utm_medium`, and `$referring_domain`.
4. **FAQ Curiosity Heatmap**:
   * Trends chart showing `faq_toggled` grouped by `question` to identify top user objections and interests.
