"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  ChefHat,
  Trees,
  PawPrint,
  LayoutGrid,
  Building2,
} from "lucide-react";
import type { LeasingInfo } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface AmenitiesProps {
  leasingInfo: LeasingInfo;
}

const amenityMeta = [
  {
    id: "utilities",
    icon: Droplets,
    title: "Utilities Included",
    getDescription: (info: LeasingInfo) =>
      info.utilitiesIncluded.join(", ") + " included with rent.",
  },
  {
    id: "kitchen",
    icon: ChefHat,
    title: "Full Kitchen Appliances",
    getDescription: () =>
      "Every home comes equipped with a full suite of kitchen appliances. Options available to add washer and dryer for a fee with monthly lease.",
  },
  {
    id: "quiet",
    icon: Trees,
    title: "Quiet Nature-Friendly Setting",
    getDescription: () =>
      "Nestled in a peaceful valley setting — far from the hustle of massive student complexes.",
  },
  {
    id: "pets",
    icon: PawPrint,
    title: "Pet-Friendly Living",
    getDescription: (info: LeasingInfo) => info.petPolicy.notes,
  },
  {
    id: "spacious",
    icon: LayoutGrid,
    title: "Spacious Layouts",
    getDescription: () =>
      "Open floor plans with room to live comfortably — alone or with roommates.",
  },
  {
    id: "new",
    icon: Building2,
    title: "Newer Construction",
    getDescription: () =>
      "Built in 2021 — one of Huntsville's newest apartment communities.",
  },
];

export default function Amenities({ leasingInfo }: AmenitiesProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  return (
    <section id="amenities" className="section-padding bg-forest-950 text-white">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold sm:text-4xl">
            Amenities &amp; Features
          </h2>
          <p className="mt-4 text-lg text-forest-200">
            Everything you need for comfortable living — included and on-site.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {amenityMeta.map((amenity) => (
            <motion.div
              key={amenity.id}
              className="rounded-2xl border border-forest-800 bg-forest-900/50 p-6 transition-colors hover:border-forest-600 hover:bg-forest-900/80"
              variants={prefersReducedMotion ? undefined : fadeUpItem}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest-700 text-forest-100">
                <amenity.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold">{amenity.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-200">
                {amenity.getDescription(leasingInfo)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
