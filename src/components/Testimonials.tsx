"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import type { Testimonials as TestimonialsContent } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface TestimonialsProps {
  content: TestimonialsContent;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-gold-400 text-gold-400"
              : "fill-slate-warm-200 text-slate-warm-200"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ReviewerInitials({ name }: { name: string }) {
  const initials = name
    .replace(/the\s+/i, "")
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-100 text-sm font-bold text-forest-700 ring-2 ring-white"
      aria-hidden="true"
    >
      {initials || "?"}
    </div>
  );
}

export default function Testimonials({ content }: TestimonialsProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section className="section-padding bg-gradient-to-b from-forest-50/50 via-ivory to-white">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold-400/15 px-4 py-1.5 text-sm font-semibold text-gold-700">
            <Quote className="h-4 w-4" aria-hidden="true" />
            Resident Stories
          </p>
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            {content.subheadline}
          </p>
        </motion.div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {content.reviews.map((review) => (
            <motion.article
              key={review.id}
              className="card flex flex-col p-6"
              variants={prefersReducedMotion ? undefined : fadeUpItem}
            >
              <StarRating rating={review.rating} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-warm-700 sm:text-base">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-slate-warm-100 pt-5">
                <ReviewerInitials name={review.name} />
                <div>
                  <cite className="not-italic font-semibold text-forest-900">
                    {review.name}
                  </cite>
                  <p className="text-sm text-slate-warm-500">{review.role}</p>
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
