"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IconX } from "./icons";
import type { Screenshot } from "@/lib/screenshots";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % screenshots.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + screenshots.length) % screenshots.length));
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, screenshots.length]);

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {screenshots.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative shrink-0 snap-start overflow-hidden rounded-xl border border-border"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={480}
              height={270}
              className="h-48 w-auto transition-transform duration-200 group-hover:scale-[1.02]"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/80"
          >
            <IconX className="h-5 w-5" />
          </button>

          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i - 1 + screenshots.length) % screenshots.length));
                }}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/80 sm:left-5"
              >
                &larr;
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? i : (i + 1) % screenshots.length));
                }}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white shadow-lg backdrop-blur transition-colors hover:bg-black/80 sm:right-5"
              >
                &rarr;
              </button>
            </>
          )}

          <img
            src={screenshots[openIndex].src}
            alt={screenshots[openIndex].alt}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-5 left-1/2 max-w-xl -translate-x-1/2 text-center text-sm text-white/70">
            {screenshots[openIndex].alt}
          </p>
        </div>
      )}
    </>
  );
}
