import Image from "next/image";
import Link from "next/link";
import { Container, FeatureCard } from "@/components/ui";
import { CodeBlock } from "@/components/CodeBlock";
import { AuthorSection } from "@/components/AuthorSection";
import { BrowserFrame } from "@/components/BrowserFrame";
import { IconActivity, IconBot, IconCheck, IconChevronDown, IconEye, IconFolder, IconServer, IconShield, IconUpload, IconX } from "@/components/icons";
import { siteConfig } from "@/lib/site";

const quickStart = `git clone ${siteConfig.githubUrl}.git
cd Aktilot

cp .env.example .env
# set OPENAI_API_KEY=sk-...

docker compose up --build`;

const stats = ["MIT Licensed", "Self-Hosted", "Docker Compose", "Powered by Temporal"];

const features = [
  {
    title: "Projects isolate your knowledge",
    body: "Group documents by team, client, or use case. Each project gets its own isolated vector store, so a query against your legal documents never bleeds into your engineering runbooks.",
    icon: IconFolder,
  },
  {
    title: "Agents that know their role",
    body: "Each agent has a configurable system prompt, persona, and retrieval depth (top_k). Your customer-facing support bot and internal audit agent can live in the same project and behave completely differently.",
    icon: IconBot,
  },
  {
    title: "Upload PDF, Word, or plain text",
    body: "Drop in a file and Aktilot handles the rest: splitting it into overlapping chunks, embedding each one via OpenAI, and indexing it into ChromaDB — with live processing status in the UI.",
    icon: IconUpload,
  },
  {
    title: "Answers with sources, always",
    body: "Every response includes the exact document chunks it was built from — filename, chunk position, and relevance score. No hallucination hiding behind a confident tone.",
    icon: IconEye,
  },
  {
    title: "Full pipeline transparency",
    body: "The UI exposes the full retrieval trace for each query: extracted keywords, vector search candidates, reranking, assembled context, and per-step timing. Nothing is a black box.",
    icon: IconActivity,
  },
  {
    title: "Resilient by design",
    body: "Ingestion and chat both run as durable Temporal workflows. Every activity is checkpointed — if OpenAI rate-limits you mid-pipeline, only the failed step retries, and no API credits are wasted.",
    icon: IconShield,
  },
  {
    title: "Runs on your infrastructure",
    body: "Postgres, ChromaDB, and the worker all run in Docker. Your documents never leave your network. You control the OpenAI key, the storage, and the retention policy.",
    icon: IconServer,
  },
];

const comparison = [
  { label: "Your data stays on your infra", hosted: false, diy: true, aktilot: true },
  { label: "Running in minutes, not weeks", hosted: true, diy: false, aktilot: true },
  { label: "Hybrid BM25 + vector retrieval", hosted: false, diy: false, aktilot: true },
  { label: "Full per-query pipeline trace", hosted: false, diy: false, aktilot: true },
  { label: "Durable, auto-retrying workflows", hosted: false, diy: false, aktilot: true },
  { label: "No per-seat or per-query fees", hosted: false, diy: true, aktilot: true },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #18181b, transparent 40%), radial-gradient(circle at 80% 0%, #18181b, transparent 40%)",
          }}
        />
        <Container className="relative py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              MIT licensed &middot; actively developed
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
              Build AI Agents that understands your documents.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Aktilot is an open-source platform for document intelligence, combining workflow orchestration, hybrid retrieval, and conversational AI into a production-ready developer experience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
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
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {stats.map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400">
                  <IconCheck className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Container>
        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <IconChevronDown className="h-5 w-5 animate-bounce text-muted/40" />
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-b border-border bg-surface py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">The problem with document AI today</h2>
            <p className="mt-4 text-muted">
              Your team has documents everywhere — contracts, reports, runbooks, research papers — and finding
              answers means either manually digging through files or paying for a hosted AI service that
              ingests your sensitive data. Building your own RAG pipeline from scratch means weeks of
              engineering work just to get a working prototype.
            </p>
            <p className="mt-4 font-medium">
              Aktilot fills that gap — a self-hosted platform that lets you ask questions in plain English, in
              minutes not weeks, with your data staying exactly where it is.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-border bg-background">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-semibold text-muted"> </th>
                  <th className="px-4 py-3 font-semibold text-muted">Hosted SaaS</th>
                  <th className="px-4 py-3 font-semibold text-muted">DIY pipeline</th>
                  <th className="px-4 py-3 font-semibold text-brand-violet">Aktilot</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-foreground">{row.label}</td>
                    <td className="px-4 py-3">
                      {row.hosted ? (
                        <IconCheck className="h-4 w-4 text-foreground" />
                      ) : (
                        <IconX className="h-4 w-4 text-muted/50" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {row.diy ? (
                        <IconCheck className="h-4 w-4 text-foreground" />
                      ) : (
                        <IconX className="h-4 w-4 text-muted/50" />
                      )}
                    </td>
                    <td className="bg-brand-violet/5 px-4 py-3">
                      {row.aktilot ? (
                        <IconCheck className="h-4 w-4 text-brand-violet" />
                      ) : (
                        <IconX className="h-4 w-4 text-muted/50" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <FeatureCard key={f.title} title={f.title} icon={<f.icon className="h-5 w-5" />}>
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
      <section className="border-b border-border bg-surface py-20">
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
            <div className="overflow-hidden rounded-xl border border-border bg-background">
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
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Nothing hides behind a spinner</h2>
            <p className="mt-4 text-muted">
              Every ingestion and chat request is a Temporal workflow you can inspect step by step — retries,
              timing, and failures included.
            </p>
          </div>
          <div className="mt-10">
            <BrowserFrame
              src="/screenshots/temporal-chat-workflow.png"
              alt="Temporal UI showing the full ChatWorkflow activity trace: keyword extraction, embedding, vector search, hybrid ranking, and answer generation"
              width={1600}
              height={900}
              url="localhost:8233 — Temporal UI"
            />
          </div>
        </Container>
      </section>

      <AuthorSection />

      {/* Quick start */}
      <section className="bg-surface py-20">
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
