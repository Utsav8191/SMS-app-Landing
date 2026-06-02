import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Prevent this file from being bundled client-side
import 'server-only';

/**
 * Initializes and returns a Google Auth client using either:
 * 1. Environment variables (e.g. on production/Vercel)
 * 2. Fallback to local credentials JSON file (local dev)
 */
function getGoogleAuthClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

  // 1. Check for Environment Variables (Production/Vercel)
  if (clientEmail && privateKey) {
    try {
      return new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, '\n'),
        },
        scopes,
      });
    } catch (error) {
      console.error('Failed to initialize Google Auth using environment variables:', error);
    }
  }

  // 2. Check for local credentials JSON key file (Local Development)
  const jsonPath = path.join(process.cwd(), 'sms-landing-498013-deffa95a2639.json');
  if (fs.existsSync(jsonPath)) {
    try {
      return new google.auth.GoogleAuth({
        keyFile: jsonPath,
        scopes,
      });
    } catch (error) {
      console.error('Failed to initialize Google Auth using local JSON key file:', error);
    }
  }

  console.warn('Google Sheets service credentials are not configured. Running in Dry Run mode.');
  return null;
}

/**
 * Ensures the "Demo Requests" sheet tab exists in the target spreadsheet.
 * If not, it creates the tab and initializes it with the correct header columns.
 */
async function ensureSheetTabExists(sheets: any, spreadsheetId: string): Promise<void> {
  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet: any) => sheet.properties?.title === 'Demo Requests'
    );

    if (!sheetExists) {
      // 1. Create the tab named "Demo Requests"
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: 'Demo Requests',
                },
              },
            },
          ],
        },
      });

      // 2. Initialize the header row
      const headers = [
        'Timestamp',
        'School Name',
        'Contact Person',
        'Designation',
        'Mobile Number',
        'Email Address',
        'School Type',
        'Student Strength',
        'Existing Software',
        'City',
        'State',
        'Preferred Demo Date',
        'Preferred Demo Time',
        'Message',
        'Lead Status',
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Demo Requests!A1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (error) {
    console.warn('Failed to verify or initialize "Demo Requests" sheet tab. Attempting to append directly...', error);
  }
}

export interface DemoRequestData {
  schoolName: string;
  contactPerson: string;
  designation: string;
  mobileNumber: string;
  emailAddress: string;
  schoolType: string;
  studentStrength: string;
  existingSoftware?: string;
  city: string;
  state: string;
  preferredDemoDate?: string;
  preferredDemoTime?: string;
  message?: string;
}

/**
 * Appends a lead row to the "Demo Requests" sheet tab in Google Sheets.
 */
export async function appendLeadToSheet(
  data: DemoRequestData
): Promise<{ success: boolean; dryRun: boolean; error?: string }> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // Verify spreadsheet ID
  if (!spreadsheetId) {
    console.log('--- DRY RUN: GOOGLE_SHEET_ID is not configured ---');
    console.log('Data:', data);
    return { success: true, dryRun: true };
  }

  // Get auth client
  const auth = getGoogleAuthClient();
  if (!auth) {
    console.log('--- DRY RUN: Google Auth credentials missing ---');
    console.log('Data:', data);
    return { success: true, dryRun: true };
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });

    // Validate that the "Demo Requests" tab exists
    await ensureSheetTabExists(sheets, spreadsheetId);

    // Format row fields matching headers
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const rowValues = [
      timestamp,
      data.schoolName,
      data.contactPerson,
      data.designation,
      data.mobileNumber,
      data.emailAddress,
      data.schoolType,
      data.studentStrength,
      data.existingSoftware || '',
      data.city,
      data.state,
      data.preferredDemoDate || '',
      data.preferredDemoTime || '',
      data.message || '',
      'New', // Default Lead Status
    ];

    // Append to "Demo Requests" sheet tab
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Demo Requests!A:O',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    return { success: true, dryRun: false };
  } catch (error: any) {
    console.error('Error appending row to Google Sheets:', error);
    return {
      success: false,
      dryRun: false,
      error: error.message || 'Failed to submit lead to Google Sheets.',
    };
  }
}
