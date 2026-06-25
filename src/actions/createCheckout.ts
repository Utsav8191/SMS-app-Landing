'use server';

export interface SubscriptionActionResponse {
  success: boolean;
  message: string;
  subscriptionId?: string;
  keyId?: string;
  isReturningCustomer?: boolean;
  errors?: Record<string, string[]>;
}

export async function createRazorpaySubscriptionAction(data: {
  schoolName: string;
  ownerEmail: string;
  ownerPhone: string;
}): Promise<SubscriptionActionResponse> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000/api/v1";

  if (!data.schoolName.trim() || !data.ownerEmail.trim() || !data.ownerPhone.trim()) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

  try {
    const response = await fetch(`${backendUrl}/billing/subscription/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return {
        success: true,
        message: "Subscription created successfully.",
        subscriptionId: result.data.subscriptionId,
        keyId: result.data.keyId,
        isReturningCustomer: result.data.isReturningCustomer,
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to create Razorpay subscription.",
      };
    }
  } catch (error: any) {
    console.error("Error calling backend billing API:", error);
    return {
      success: false,
      message: "Unable to connect to the billing gateway server. Please try again.",
    };
  }
}

export interface EligibilityActionResponse {
  success: boolean;
  message: string;
  isReturningCustomer?: boolean;
}

export async function checkSubscriptionEligibilityAction(data: {
  email: string;
}): Promise<EligibilityActionResponse> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000/api/v1";

  if (!data.email.trim()) {
    return {
      success: false,
      message: "Email is required.",
    };
  }

  try {
    const response = await fetch(`${backendUrl}/billing/subscription/check-eligibility`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return {
        success: true,
        message: "Eligibility checked successfully.",
        isReturningCustomer: result.data.isReturningCustomer,
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to check eligibility.",
      };
    }
  } catch (error: any) {
    console.error("Error calling backend eligibility check API:", error);
    return {
      success: false,
      message: "Unable to connect to the billing gateway server. Please try again.",
    };
  }
}
