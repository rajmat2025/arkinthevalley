"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types/apartment";
import { useMotionSafe, fadeUpItem, getMotionProps } from "@/lib/motion";

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container-narrow max-w-3xl">
        <motion.div
          className="mb-14 text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            Quick answers about living at Ark in the Valley.
          </p>
        </motion.div>

        <div className="divide-y divide-slate-warm-200 rounded-2xl border border-slate-warm-200 bg-white shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-forest-50/50"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-forest-900">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-forest-600 transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? false
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? undefined
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-warm-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
