'use server';

import { appendLeadToSheet } from '@/lib/googleSheets';
import { demoFormSchema } from '@/schemas/demo';
import type { DemoFormValues } from '@/schemas/demo';

export interface ServerActionResponse {
  success: boolean;
  dryRun?: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitDemoRequest(formData: DemoFormValues): Promise<ServerActionResponse> {
  // Validate incoming fields server-side
  const result = demoFormSchema.safeParse(formData);

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
    const res = await appendLeadToSheet(result.data);

    if (res.success) {
      return {
        success: true,
        dryRun: res.dryRun,
        message:
          'Thank you for your interest. Our team has received your request and will contact you shortly to schedule a personalized demonstration.',
      };
    } else {
      return {
        success: false,
        message: res.error || 'Failed to submit request. Please try again.',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'A system error occurred. Please try again.',
    };
  }
}
