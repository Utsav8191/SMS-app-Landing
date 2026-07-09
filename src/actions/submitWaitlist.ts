'use server';

import { Resend } from 'resend';
import { appendWaitlistToSheet, updateWaitlistFeedback } from '@/lib/googleSheets';
import { waitlistFormSchema } from '@/schemas/waitlist';
import type { WaitlistFormValues } from '@/schemas/waitlist';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export interface ServerActionResponse {
  success: boolean;
  dryRun?: boolean;
  rowNumber?: number;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitWaitlistRequest(formData: WaitlistFormValues): Promise<ServerActionResponse> {
  // Validate incoming fields server-side
  const result = waitlistFormSchema.safeParse(formData);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    Object.entries(result.error.flatten().fieldErrors).forEach(([key, val]) => {
      if (val) fieldErrors[key] = val;
    });
    return {
      success: false,
      message: 'Validation failed.',
      errors: fieldErrors,
    };
  }

  try {
    // 1. Save to Google Sheets
    const res = await appendWaitlistToSheet(result.data);

    if (!res.success) {
      return {
        success: false,
        message: res.error || 'Failed to join the waitlist. Please try again.',
      };
    }

    // 2. Send "You're on the list!" email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Alpine grow <onboarding@resend.dev>',
          to: result.data.emailAddress,
          subject: "You're on the list!",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
               <h2 style="color: #1D4ED8; font-size: 24px;">Welcome to the Alpine grow Waitlist!</h2>
              <p>Hi there,</p>
              <p>Thank you for your interest in Alpine grow. We've successfully registered <strong>${result.data.schoolName}</strong> on our priority access list.</p>
              <p>We will keep you updated and notify you as soon as registrations open for institutions of your size (<strong>${result.data.studentStrength} students</strong>).</p>
              <br />
              <p>Best regards,</p>
              <p><strong>The Alpine grow Team</strong></p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Error sending confirmation email via Resend:', emailError);
      }
    } else {
      console.log('--- DRY RUN: RESEND_API_KEY is not configured ---');
      console.log('Confirmation email would be sent to:', result.data.emailAddress);
    }

    return {
      success: true,
      dryRun: res.dryRun,
      rowNumber: res.rowNumber,
      message: 'Successfully joined the waitlist.',
    };
  } catch (error) {
    console.error('Error in submitWaitlistRequest server action:', error);
    return {
      success: false,
      message: 'A system error occurred. Please try again.',
    };
  }
}

export async function submitWaitlistFeedback(
  rowNumber: number,
  frustration: string
): Promise<ServerActionResponse> {
  if (!rowNumber || rowNumber <= 1) {
    return {
      success: false,
      message: 'Invalid row identifier.',
    };
  }

  const trimmedFrustration = frustration?.trim();
  if (!trimmedFrustration) {
    return {
      success: false,
      message: 'Frustration message cannot be empty.',
    };
  }

  try {
    const res = await updateWaitlistFeedback(rowNumber, trimmedFrustration);

    if (res.success) {
      return {
        success: true,
        dryRun: res.dryRun,
        message: 'Successfully submitted feedback.',
      };
    } else {
      return {
        success: false,
        message: res.error || 'Failed to submit feedback. Please try again.',
      };
    }
  } catch (error) {
    console.error('Error in submitWaitlistFeedback server action:', error);
    return {
      success: false,
      message: 'A system error occurred. Please try again.',
    };
  }
}
