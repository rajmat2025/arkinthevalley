"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import PropertyImage from "@/components/ui/PropertyImage";
import type { GalleryImage } from "@/types/apartment";
import {
  useMotionSafe,
  staggerContainer,
  fadeUpItem,
  getMotionProps,
} from "@/lib/motion";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { prefersReducedMotion } = useMotionSafe();
  const motionProps = getMotionProps(prefersReducedMotion);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, [images.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-white to-forest-50/40">
      <div className="container-narrow">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          variants={prefersReducedMotion ? undefined : fadeUpItem}
          {...motionProps}
        >
          <h2 className="section-heading text-3xl font-bold text-forest-900 sm:text-4xl">
            Photo Gallery
          </h2>
          <p className="mt-4 text-lg text-slate-warm-600">
            Take a look at Ark in the Valley — real photos of our community and
            apartments.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          variants={prefersReducedMotion ? undefined : staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, margin: "-50px" }}
        >
          {images.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-slate-warm-200/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
              variants={prefersReducedMotion ? undefined : fadeUpItem}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.03, y: -4, transition: { duration: 0.25 } }
              }
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View larger: ${image.alt}`}
            >
              <PropertyImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center bg-forest-950/0 transition-colors duration-300 group-hover:bg-forest-950/20">
                <motion.span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
                  initial={false}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.1, backgroundColor: "rgba(255,255,255,0.35)" }
                  }
                >
                  <ZoomIn className="h-6 w-6" aria-hidden="true" />
                </motion.span>
              </div>
              <span className="absolute bottom-3 left-3 right-3 text-left text-xs font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                {image.alt}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/95 p-4"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-16"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={images[lightboxIndex].src}
                className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-lg"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, x: 40, scale: 0.96 }
                }
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, x: -40, scale: 0.96 }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <PropertyImage
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  width={1200}
                  height={900}
                  className="max-h-[85vh] w-auto object-contain"
                />
                <p className="mt-3 text-center text-sm text-forest-100">
                  {images[lightboxIndex].alt}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
