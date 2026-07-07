import Image from "next/image";
import Link from "next/link";
import { Container, FeatureCard } from "@/components/ui";
import { CodeBlock } from "@/components/CodeBlock";
import { siteConfig } from "@/lib/site";

const quickStart = `git clone ${siteConfig.githubUrl}.git
cd Aktilot

cp .env.example .env
# set OPENAI_API_KEY=sk-...

docker compose up --build`;

const features = [
  {
    title: "Projects isolate your knowledge",
    body: "Group documents by team, client, or use case. Each project gets its own isolated vector store, so a query against your legal documents never bleeds into your engineering runbooks.",
  },
  {
    title: "Agents that know their role",
    body: "Each agent has a configurable system prompt, persona, and retrieval depth (top_k). Your customer-facing support bot and internal audit agent can live in the same project and behave completely differently.",
  },
  {
    title: "Upload PDF, Word, or plain text",
    body: "Drop in a file and Aktilot handles the rest: splitting it into overlapping chunks, embedding each one via OpenAI, and indexing it into ChromaDB — with live processing status in the UI.",
  },
  {
    title: "Answers with sources, always",
    body: "Every response includes the exact document chunks it was built from — filename, chunk position, and relevance score. No hallucination hiding behind a confident tone.",
  },
  {
    title: "Full pipeline transparency",
    body: "The UI exposes the full retrieval trace for each query: extracted keywords, vector search candidates, reranking, assembled context, and per-step timing. Nothing is a black box.",
  },
  {
    title: "Resilient by design",
    body: "Ingestion and chat both run as durable Temporal workflows. Every activity is checkpointed — if OpenAI rate-limits you mid-pipeline, only the failed step retries, and no API credits are wasted.",
  },
  {
    title: "Runs on your infrastructure",
    body: "Postgres, ChromaDB, and the worker all run in Docker. Your documents never leave your network. You control the OpenAI key, the storage, and the retention policy.",
  },
  {
    title: "Observability out of the box",
    body: "Metrics, traces, and 7 pre-built Grafana dashboards covering LLM performance, retrieval quality, token costs, prompt intelligence, vector DB health, and Temporal workflow execution.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #7c3aed, transparent 40%), radial-gradient(circle at 80% 0%, #4338ca, transparent 40%)",
          }}
        />
        <Container className="relative py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                MIT licensed &middot; actively developed
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                Chat with your documents.
                <br />
                <span className="brand-gradient-text">On your infrastructure.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted">
                Aktilot is a self-hosted, open-source RAG platform. Upload your documents, ask questions in
                plain English, and get cited answers — with no data ever leaving your servers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/docs"
                  className="brand-gradient flex h-11 items-center rounded-md px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Get Started
                </Link>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center rounded-md border border-border px-5 text-sm font-semibold transition-colors hover:bg-surface"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/hero.png"
                alt="Aktilot abstract brand graphic"
                width={480}
                height={480}
                priority
                className="w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Problem / Solution */}
      <section className="border-b border-border py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The problem with document AI today</h2>
            <p className="mt-4 text-muted">
              Your team has documents everywhere — contracts, reports, runbooks, research papers — and finding
              answers means either manually digging through files or paying for a hosted AI service that
              ingests your sensitive data. Hosted document AI tools are expensive, opaque, and require you to
              hand over your files to a third party. Building your own RAG pipeline from scratch means weeks of
              engineering work just to get a working prototype.
            </p>
            <p className="mt-4 font-medium">
              Aktilot fills that gap — a self-hosted platform that lets you ask questions in plain English, in
              minutes not weeks, with your data staying exactly where it is.
            </p>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="border-b border-border py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What Aktilot does</h2>
            <p className="mt-4 text-muted">
              Everything you need to turn a pile of documents into a reliable, traceable Q&amp;A system.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <FeatureCard key={f.title} title={f.title}>
                {f.body}
              </FeatureCard>
            ))}
          </div>
          <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 border-brand-violet pl-6 text-muted italic">
            Aktilot uses a hybrid BM25 + vector retrieval approach — combining keyword overlap scoring with
            semantic similarity — which consistently outperforms pure vector search on precise factual
            questions like dates, names, and figures.
          </blockquote>
        </Container>
      </section>

      {/* Architecture */}
      <section className="border-b border-border py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Durable by design</h2>
              <p className="mt-4 text-muted">
                Document ingestion and chat both run as workflows on a Temporal cluster. Every activity is
                individually retryable and checkpointed — a failed OpenAI call retries alone, without
                re-running earlier steps or wasting API credits.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-semibold text-brand-violet">DocumentWorkflow</span>
                  <span className="text-muted">chunks, embeds, and indexes uploaded files into ChromaDB</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-brand-violet">ChatWorkflow</span>
                  <span className="text-muted">hybrid retrieval, LLM generation, conversation persistence</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-brand-violet">BenchmarkWorkflow</span>
                  <span className="text-muted">
                    evaluates retrieval quality with Recall@K, MRR, and latency <em>(coming soon)</em>
                  </span>
                </li>
              </ul>
              <Link
                href="/docs/architecture"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-violet hover:underline"
              >
                Read the architecture deep dive &rarr;
              </Link>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <Image
                src="/architecture-diagram.png"
                alt="Aktilot architecture diagram: Temporal cluster orchestrating DocumentWorkflow, ChatWorkflow, and BenchmarkWorkflow across Postgres, ChromaDB, and an evaluation DB"
                width={1200}
                height={900}
                className="w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Screenshot */}
      <section className="border-b border-border py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">See exactly where every answer comes from</h2>
            <p className="mt-4 text-muted">
              Every chat response is grounded in your uploaded documents and shows its receipts.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-xl border border-border shadow-xl">
            <Image
              src="/screenshots/chat.png"
              alt="Aktilot chat interface showing a grounded answer with cited source chunks"
              width={1600}
              height={900}
              className="w-full"
            />
          </div>
        </Container>
      </section>

      {/* Quick start */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Running in minutes</h2>
            <p className="mt-4 text-muted">
              You need Docker and an OpenAI API key. That&apos;s it.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <CodeBlock code={quickStart} label="Terminal" />
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="/docs"
              className="brand-gradient flex h-11 items-center rounded-md px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Read the full setup guide
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
