"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Store,
  TreePine,
  Hospital,
  Landmark,
  Trees,
} from "lucide-react";
import type { LocationContent } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface LocationMapProps {
  content: LocationContent;
  address: string;
}

const iconMap = {
  "Sam Houston State University": GraduationCap,
  "Downtown Huntsville": Store,
  "Huntsville State Park": TreePine,
  "Sam Houston Memorial Museum": Landmark,
  "Sam Houston National Forest": Trees,
  "Huntsville Memorial Hospital": Hospital,
};

export default function LocationMap({ content, address }: LocationMapProps) {
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section id="location" className="section-padding bg-ivory">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            {content.subheadline}
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            className="overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-warm-200/60"
            variants={prefersReducedMotion ? undefined : fadeUpItem}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <iframe
              src={mapSrc}
              title={`Map showing Ark in the Valley at ${address}`}
              className="aspect-[4/3] h-full min-h-[320px] w-full border-0 lg:min-h-[480px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            variants={prefersReducedMotion ? undefined : staggerContainer}
            initial={prefersReducedMotion ? false : "hidden"}
            whileInView={prefersReducedMotion ? undefined : "visible"}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-warm-200/60">
              <h3 className="text-lg font-semibold text-forest-900">
                {address}
              </h3>
              <p className="mt-2 text-slate-warm-600">
                Your gateway to SHSU, downtown festivals, state park weekends,
                and the natural beauty of East Texas — all within an easy drive.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.proximityPoints.map((point) => {
                const Icon = iconMap[point.name as keyof typeof iconMap] ?? Store;

                return (
                  <motion.div
                    key={point.name}
                    className="card flex items-start gap-4 p-5"
                    variants={prefersReducedMotion ? undefined : fadeUpItem}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-forest-900">
                        {point.name}
                      </h4>
                      <p className="text-sm font-medium text-accent-600">
                        {point.time}
                        {point.distance ? ` · ${point.distance}` : ""}
                      </p>
                      {point.detail && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-warm-600">
                          {point.detail}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
