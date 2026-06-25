import { z } from 'zod';

export const studentStrengths = [
  'Less than 100',
  '100–500',
  '500–1000',
  '1000–3000',
  '3000+'
] as const;

export const waitlistFormSchema = z.object({
  emailAddress: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
  schoolName: z
    .string()
    .trim()
    .min(2, 'School name must be at least 2 characters.'),
  studentStrength: z.enum(studentStrengths, {
    message: 'Please select a valid student range.'
  })
});

export type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;
