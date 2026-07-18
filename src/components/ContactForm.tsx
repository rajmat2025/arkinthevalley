"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import type { Community, FloorPlan } from "@/types/apartment";
import { useMotionSafe, fadeUpItem, getMotionProps } from "@/lib/motion";

interface ContactFormProps {
  community: Community;
  floorPlans: FloorPlan[];
  web3formsAccessKey?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  floorPlan: string;
  moveInDate: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  floorPlan: "",
  moveInDate: "",
  message: "",
};

export default function ContactForm({
  community,
  floorPlans,
  web3formsAccessKey,
}: ContactFormProps) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!web3formsAccessKey?.trim()) {
      setErrorMessage(
        "Contact form is not configured yet. Add integrations.web3formsAccessKey to apartmentData.json."
      );
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey.trim(),
          subject: `New inquiry — ${community.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          replyto: form.email,
          phone: form.phone,
          floor_plan: form.floorPlan || "Not specified",
          move_in_date: form.moveInDate || "Not specified",
          message: form.message,
        }),
      });

      let data: { success?: boolean; message?: string } = {};
      try {
        data = await response.json();
      } catch {
        setErrorMessage(
          "Unexpected response from email service. Please try again or contact us directly."
        );
        setStatus("error");
        return;
      }

      if (response.ok && data.success) {
        setStatus("success");
        setForm(initialForm);
        setErrors({});
      } else {
        setErrorMessage(
          data.message ||
            "Something went wrong. Please try again or contact us directly."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        "Unable to reach the email service. Please try again or contact us directly."
      );
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-warm-300 bg-white px-4 py-3 text-charcoal transition-colors focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-warm-700";

  return (
    <section id="contact" className="section-padding bg-ivory">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            Ready to schedule a tour or ask about availability? Send us a
            message and our leasing team will get back to you.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          <motion.div
            className="lg:col-span-2"
            variants={prefersReducedMotion ? undefined : fadeUpItem}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="card p-8">
              <h3 className="text-lg font-semibold text-forest-900">
                Get in Touch
              </h3>
              <p className="mt-2 text-slate-warm-600">
                Prefer to reach out directly? We&apos;re here to help.
              </p>

              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href={`tel:${community.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 text-slate-warm-700 transition-colors hover:text-forest-700"
                  >
                    <Phone className="h-5 w-5 text-forest-600" aria-hidden="true" />
                    {community.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${community.email}`}
                    className="flex items-center gap-3 text-slate-warm-700 transition-colors hover:text-forest-700"
                  >
                    <Mail className="h-5 w-5 text-forest-600" aria-hidden="true" />
                    {community.email}
                  </a>
                </li>
              </ul>

              <div className="mt-6 border-t border-slate-warm-200 pt-6">
                <p className="text-sm font-medium text-slate-warm-700">
                  Office Hours
                </p>
                <p className="mt-1 text-sm text-slate-warm-600">
                  {community.officeHours}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-warm-200 pt-6">
                <p className="text-sm font-medium text-slate-warm-700">
                  Address
                </p>
                <p className="mt-1 text-sm text-slate-warm-600">
                  {community.address}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="card p-8 lg:col-span-3"
            onSubmit={handleSubmit}
            noValidate
            variants={prefersReducedMotion ? undefined : fadeUpItem}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="floorPlan" className={labelClass}>
                  Preferred Floor Plan
                </label>
                <select
                  id="floorPlan"
                  className={inputClass}
                  value={form.floorPlan}
                  onChange={(e) =>
                    setForm({ ...form, floorPlan: e.target.value })
                  }
                >
                  <option value="">Select a floor plan</option>
                  {floorPlans.map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="moveInDate" className={labelClass}>
                  Desired Move-in Date
                </label>
                <input
                  id="moveInDate"
                  type="date"
                  className={inputClass}
                  value={form.moveInDate}
                  onChange={(e) =>
                    setForm({ ...form, moveInDate: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us about your move-in timeline or any questions..."
                />
              </div>
            </div>

            {status === "success" && (
              <div
                className="mt-5 flex items-center gap-2 rounded-xl bg-forest-100 px-4 py-3 text-sm text-forest-800"
                role="status"
              >
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                Thank you! Your message has been sent. We&apos;ll be in touch
                soon.
              </div>
            )}

            {status === "error" && (
              <div
                className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                Something went wrong. Please try again or contact us directly.
                {errorMessage ? ` ${errorMessage}` : ""}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary mt-6 w-full sm:w-auto"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
