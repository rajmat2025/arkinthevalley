import { Facebook } from "lucide-react";
import type { Community } from "@/types/apartment";

interface FooterProps {
  community: Community;
}

export default function Footer({ community }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-forest-200">
      <div className="container-narrow section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-xl font-semibold text-white">
              {community.name}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              A peaceful {community.unitCount}-unit apartment community in
              Huntsville, Texas — minutes from SHSU without the congestion.
            </p>
            <a
              href={community.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-forest-700 bg-forest-900/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-forest-500 hover:bg-forest-800"
            >
              <Facebook className="h-4 w-4" aria-hidden="true" />
              Follow us on Facebook
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <address className="mt-3 space-y-2 text-sm not-italic">
              <p>{community.address}</p>
              <p>
                <a
                  href={`tel:${community.phone.replace(/\D/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {community.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${community.email}`}
                  className="transition-colors hover:text-white"
                >
                  {community.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Office Hours
            </h3>
            <p className="mt-3 text-sm">{community.officeHours}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-forest-800 pt-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 64 64"
              className="h-10 w-10 shrink-0"
              aria-hidden="true"
            >
              <rect width="64" height="64" fill="#fff" rx="4" />
              <path
                fill="#1e2629"
                d="M8 48V16h12l8 8h20v24H8zm4-4h40V28H26l-8-8H12v32z"
              />
              <path fill="#1e2629" d="M20 36h24v4H20zm0-8h16v4H20z" />
            </svg>
            <p className="max-w-xs text-xs leading-relaxed">
              Equal Housing Opportunity. We are pledged to the letter and spirit
              of U.S. policy for the achievement of equal housing opportunity
              throughout the Nation.
            </p>
          </div>
          <p className="text-xs text-forest-400">
            &copy; {year} {community.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
