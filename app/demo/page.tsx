import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { screenshots } from "@/lib/screenshots";

export const metadata: Metadata = {
  title: "Demo",
  description: "Video walkthroughs of Aktilot: uploading documents, creating agents, and tracing every retrieval step.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Demo"
        title="See Aktilot in action"
        description="Short walkthroughs of uploading documents, creating agents, and tracing every retrieval step end to end."
      />
      <Container className="py-14">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image would strip the animation */}
          <img src="/screenshots/demo.gif" alt="Aktilot walkthrough: uploading documents, creating agents, and tracing retrieval" className="w-full" />
        </div>

        <div className="mt-16">
          <h2 className="text-lg font-semibold">Screenshots</h2>
          <p className="mt-1 text-sm text-muted">Click any screenshot to view it full-size.</p>
          <div className="mt-6">
            <ScreenshotGallery screenshots={screenshots} />
          </div>
        </div>
      </Container>
    </>
  );
}
