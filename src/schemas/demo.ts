import { z } from 'zod';

// Designation dropdown options
export const designations = [
  'Principal',
  'Director',
  'Administrator',
  'School Owner',
  'Vice Principal',
  'IT Administrator',
  'Other'
] as const;

// School Type dropdown options
export const schoolTypes = [
  'Pre School',
  'Primary School',
  'Secondary School',
  'Higher Secondary School',
  'K-12 School',
  'College',
  'Coaching Institute',
  'Other'
] as const;

// Number of Students options
export const studentStrengths = [
  'Less than 100',
  '100–500',
  '500–1000',
  '1000–3000',
  '3000+'
] as const;

// Preferred Demo Time options
export const preferredDemoTimes = [
  'Morning (9AM - 12PM)',
  'Afternoon (12PM - 4PM)',
  'Evening (4PM - 7PM)'
] as const;

// Helper to transform empty HTML form strings into undefined for clean optional validation
const emptyToUndefined = (val: unknown) => (val === '' ? undefined : val);

// Zod Validation Schema
export const demoFormSchema = z.object({
  schoolName: z
    .string()
    .trim()
    .min(2, 'School name must be at least 2 characters.'),
  contactPerson: z
    .string()
    .trim()
    .min(2, 'Contact person name must be at least 2 characters.'),
  designation: z.enum(designations, {
    message: 'Please select a valid designation.'
  }),
  mobileNumber: z
    .string()
    .trim()
    .min(10, 'Mobile number must be at least 10 digits.')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number starting with 6-9.'),
  emailAddress: z
    .string()
    .trim()
    .email('Please enter a valid email address.'),
  schoolType: z.enum(schoolTypes, {
    message: 'Please select a valid school type.'
  }),
  studentStrength: z.enum(studentStrengths, {
    message: 'Please select a valid student range.'
  }),
  existingSoftware: z.preprocess(emptyToUndefined, z.string().optional()),
  city: z
    .string()
    .trim()
    .min(2, 'City name is required.'),
  state: z
    .string()
    .trim()
    .min(2, 'State name is required.'),
  preferredDemoDate: z.preprocess(emptyToUndefined, z.string().optional()),
  preferredDemoTime: z.preprocess(emptyToUndefined, z.enum(preferredDemoTimes).optional()),
  message: z.preprocess(emptyToUndefined, z.string().optional())
});

export type DemoFormValues = z.infer<typeof demoFormSchema>;
