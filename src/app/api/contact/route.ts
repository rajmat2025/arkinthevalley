import { NextResponse } from "next/server";
import { getApartmentData } from "@/lib/apartment-data";
import {
  getWeb3FormsAccessKey,
  submitToWeb3Forms,
  type ContactSubmission,
} from "@/lib/web3forms";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(body: Partial<ContactSubmission>) {
  const errors: Record<string, string> = {};

  if (!body.name?.trim()) errors.name = "Name is required";
  if (!body.email?.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(body.email.trim())) {
    errors.email = "Enter a valid email address";
  }
  if (!body.phone?.trim()) errors.phone = "Phone is required";

  return errors;
}

export async function POST(request: Request) {
  const accessKey = getWeb3FormsAccessKey();
  if (!accessKey) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Contact form is not configured yet. Add web3formsAccessKey to data/apartmentData.json or set WEB3FORMS_ACCESS_KEY.",
      },
      { status: 503 }
    );
  }

  let body: Partial<ContactSubmission>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Please fix the highlighted fields.", errors },
      { status: 400 }
    );
  }

  const submission: ContactSubmission = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    phone: body.phone!.trim(),
    floorPlan: body.floorPlan?.trim(),
    moveInDate: body.moveInDate?.trim(),
    message: body.message?.trim(),
  };

  const communityName = getApartmentData().community.name;
  const result = await submitToWeb3Forms(accessKey, communityName, submission);

  if (!result.ok) {
    return NextResponse.json(
      { success: false, message: result.message },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
