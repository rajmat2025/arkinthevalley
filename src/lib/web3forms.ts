import { getApartmentData } from "@/lib/apartment-data";

export function getWeb3FormsAccessKey(): string | null {
  const fromEnv =
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();

  if (fromEnv) return fromEnv;

  const fromData = getApartmentData().integrations?.web3formsAccessKey?.trim();
  return fromData || null;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string;
  floorPlan?: string;
  moveInDate?: string;
  message?: string;
}

export async function submitToWeb3Forms(
  accessKey: string,
  communityName: string,
  submission: ContactSubmission
) {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New inquiry — ${communityName}`,
      from_name: submission.name,
      name: submission.name,
      email: submission.email,
      replyto: submission.email,
      phone: submission.phone,
      floor_plan: submission.floorPlan || "Not specified",
      move_in_date: submission.moveInDate || "Not specified",
      message: submission.message || "",
    }),
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await response.json();
  } catch {
    return {
      ok: false,
      message: "Unexpected response from email service.",
    };
  }

  if (!response.ok || !data.success) {
    return {
      ok: false,
      message: data.message || "Email service rejected the submission.",
    };
  }

  return { ok: true as const };
}
