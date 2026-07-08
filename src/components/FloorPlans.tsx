"use client";

import { motion } from "framer-motion";
import { Maximize2, Check } from "lucide-react";
import PropertyImage from "@/components/ui/PropertyImage";
import type { FloorPlan } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface FloorPlansProps {
  floorPlans: FloorPlan[];
}

export default function FloorPlans({ floorPlans }: FloorPlansProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section id="floor-plans" className="section-padding bg-ivory">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            Floor Plans
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            Choose the layout that fits your lifestyle — spacious apartments with
            full kitchens and a quiet community setting.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {floorPlans.map((plan) => (
            <motion.article
              key={plan.id}
              className="card overflow-hidden"
              variants={prefersReducedMotion ? undefined : fadeUpItem}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <PropertyImage
                  src={plan.image}
                  alt={`${plan.name} floor plan at Ark in the Valley`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
                <span
                  className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                    plan.isAvailable
                      ? "bg-forest-600 text-white"
                      : "bg-slate-warm-500 text-white"
                  }`}
                >
                  {plan.isAvailable
                    ? `[${plan.availableUnitsCount}] Available`
                    : "Waitlist Only"}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-forest-900">
                  {plan.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <p className="text-2xl font-bold text-forest-700">
                    From {plan.rentRange ?? `$${plan.baseRent.toLocaleString()}`}/mo
                  </p>
                  <span className="flex items-center gap-1 text-sm text-slate-warm-600">
                    <Maximize2 className="h-4 w-4" aria-hidden="true" />
                    {plan.sizeSqFt.toLocaleString()} sq ft
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-slate-warm-700"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-forest-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {plan.isAvailable ? (
                    <a href="#contact" className="btn-primary w-full sm:w-auto">
                      Apply / Reserve Now
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="btn-outline w-full border-slate-warm-400 text-slate-warm-600 hover:border-slate-warm-600 hover:bg-slate-warm-600 sm:w-auto"
                    >
                      Join the Waitlist
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
