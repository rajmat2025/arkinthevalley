"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface PropertyImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function PropertyImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
}: PropertyImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex aspect-[4/3] flex-col items-center justify-center bg-slate-warm-100 text-slate-warm-500 ${fill ? "absolute inset-0" : ""} ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon className="mb-2 h-10 w-10 opacity-40" aria-hidden="true" />
        <span className="px-4 text-center text-xs font-medium uppercase tracking-wide">
          Photo placeholder — replace with real image
        </span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className,
    sizes: sizes ?? "(max-width: 768px) 100vw, 50vw",
    priority,
    onError: () => setHasError(true),
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return (
    <Image
      {...imageProps}
      width={width ?? 800}
      height={height ?? 600}
    />
  );
}
