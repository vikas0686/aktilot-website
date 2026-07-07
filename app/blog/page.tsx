import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/ui";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes from building Aktilot — RAG architecture, observability, and retrieval quality.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from building Aktilot"
        description="Engineering write-ups on RAG architecture, retrieval quality, and running LLM pipelines in production."
      />
      <Container className="py-14">
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-border p-6 transition-colors hover:border-brand-violet/40"
            >
              <time className="text-xs font-medium uppercase tracking-wide text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 text-xl font-bold tracking-tight">{post.title}</h2>
              <p className="mt-2 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
