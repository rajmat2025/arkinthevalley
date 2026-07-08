import type { Promotions } from "@/types/apartment";

interface PromoBannerProps {
  promotions: Promotions;
}

export default function PromoBanner({ promotions }: PromoBannerProps) {
  return (
    <div
      className="bg-forest-700 px-4 py-2.5 text-center text-sm font-medium text-white sm:text-base"
      role="banner"
    >
      <p>{promotions.bannerText}</p>
      {promotions.offerDescription && (
        <span className="mt-0.5 block text-xs text-forest-100 sm:inline sm:ml-2 sm:mt-0">
          {promotions.offerDescription}
        </span>
      )}
      {!promotions.offerDescription && promotions.endDate && (
        <span className="mt-0.5 block text-xs text-forest-100 sm:inline sm:ml-2 sm:mt-0">
          {promotions.endDate}
        </span>
      )}
    </div>
  );
}
