import type { Promotions } from "@/types/apartment";

export function isPromotionActive(promotions: Promotions): boolean {
  if (!promotions.isActive) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiresOn = new Date(promotions.expiresOn + "T23:59:59");
  return today <= expiresOn;
}
