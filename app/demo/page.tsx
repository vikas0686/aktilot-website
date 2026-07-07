import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";
import { IconPlay } from "@/components/icons";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { demoVideos } from "@/lib/demo";
import { screenshots } from "@/lib/screenshots";
import { siteConfig } from "@/lib/site";

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
        {demoVideos.length === 0 ? (
          <div className="mx-auto flex max-w-xl flex-col items-center rounded-xl border border-dashed border-border py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full brand-gradient text-white">
              <IconPlay className="h-5 w-5 translate-x-0.5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">Demo videos coming soon</h2>
            <p className="mt-2 max-w-sm text-sm text-muted">
              We&apos;re recording walkthroughs of the full flow — projects, agents, uploads, and the
              retrieval trace. Check back soon.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/docs"
                className="brand-gradient flex h-10 items-center rounded-md px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Read the docs
              </Link>
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center rounded-md border border-border px-4 text-sm font-semibold transition-colors hover:bg-surface"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {demoVideos.map((video) => (
              <div key={video.slug} className="overflow-hidden rounded-xl border border-border bg-surface">
                <div className="aspect-video">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{video.title}</h3>
                  <p className="mt-1 text-sm text-muted">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

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
