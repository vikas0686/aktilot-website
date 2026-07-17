import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Aktilot works under the hood: Temporal-orchestrated DocumentWorkflow and ChatWorkflow, hybrid BM25 + vector retrieval, and where it sits on the RAG maturity model.",
  alternates: { canonical: "/docs/architecture/" },
};

const maturityLevels = [
  {
    level: "Level 1",
    name: "Basic RAG",
    desc: "Embed a question, do a single vector search, stuff the top chunks into a prompt. Most tutorials stop here.",
    current: false,
  },
  {
    level: "Level 2",
    name: "Pipeline RAG",
    desc: "Keywords → search → rank → context → answer, with hybrid scoring and full tool-step visibility. This is where Aktilot is today.",
    current: true,
  },
  {
    level: "Level 3",
    name: "Agentic RAG",
    desc: "The agent decides steps dynamically — it can loop, verify its own answer, or decompose a question into sub-queries, and it has memory across turns.",
    current: false,
  },
  {
    level: "Level 4",
    name: "Multi-Agent RAG",
    desc: "Specialised agents coordinated by an orchestrator — production RAG at scale.",
    current: false,
  },
];

export default function ArchitecturePage() {
  return (
    <article className="prose-content mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Architecture</h1>
      <p className="mt-3 text-muted">
        Aktilot ships as a Docker Compose stack: a React frontend, a FastAPI backend, a Temporal cluster for
        durable workflow execution, Postgres for metadata, and ChromaDB for vectors — plus a full
        OpenTelemetry observability stack.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <Image
          src="/architecture-diagram.png"
          alt="Aktilot architecture diagram: Temporal cluster orchestrating DocumentWorkflow, ChatWorkflow, and BenchmarkWorkflow across Postgres, ChromaDB, and an evaluation DB"
          width={1200}
          height={900}
          className="w-full"
        />
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Workflows on a Temporal cluster</h2>
      <p className="mt-3 text-muted">
        All three workflows run on a Temporal cluster for durable, individually-retryable execution:
      </p>

      <div className="mt-6 space-y-6">
        <div className="rounded-lg border border-border p-5">
          <h3 className="font-semibold text-brand-violet">DocumentWorkflow</h3>
          <p className="mt-2 text-sm text-muted">
            Chunks, embeds, and indexes uploaded files into ChromaDB. Metadata is stored in Postgres.
          </p>
          <p className="mt-3 text-xs text-muted">
            Activities observed in a real trace:{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">
              update_file_status → read_and_split_file → clear_existing_vectors → embed_and_index_chunks →
              update_file_status
            </code>
          </p>
        </div>
        <div className="rounded-lg border border-border p-5">
          <h3 className="font-semibold text-brand-violet">ChatWorkflow</h3>
          <p className="mt-2 text-sm text-muted">
            Hybrid BM25 + vector retrieval, LLM answer generation, and conversation persistence. Each step is
            checkpointed; a failed OpenAI call retries alone without re-running earlier steps.
          </p>
          <p className="mt-3 text-xs text-muted">
            Activities observed in a real trace:{" "}
            <code className="rounded bg-surface px-1.5 py-0.5">
              get_agent_config → extract_keywords → embed_query → search_vectors → hybrid_rank →
              generate_answer → persist_messages
            </code>
          </p>
        </div>
        <div className="rounded-lg border border-border p-5">
          <h3 className="font-semibold text-brand-violet">
            BenchmarkWorkflow <span className="font-normal text-muted">(coming soon)</span>
          </h3>
          <p className="mt-2 text-sm text-muted">
            Evaluates retrieval quality with Recall@K, MRR, and latency metrics, storing results in an
            evaluation DB.
          </p>
        </div>
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Retrieval pipeline</h2>
      <p className="mt-3 text-muted">
        Ingestion parses PDF (pypdf/pdfplumber), DOCX (python-docx), or plain text, cleans it, splits it into
        overlapping chunks (~1000 characters with ~200 character overlap), embeds each chunk with{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">text-embedding-3-small</code> (1536 dimensions),
        and writes it into ChromaDB.
      </p>
      <p className="mt-3 text-muted">
        At query time, Aktilot extracts keywords, runs dense vector search and sparse BM25 search in
        parallel, blends and reranks the results, assembles context from the top-ranked chunks, and generates
        an answer:
      </p>
      <blockquote className="mt-4 border-l-2 border-brand-violet pl-6 text-sm italic text-muted">
        final_score = (0.5 &times; vector_similarity) + (0.5 &times; keyword_match_ratio)
      </blockquote>
      <p className="mt-3 text-sm text-muted">
        This is the simplest hybrid variant — a production system tuned further would use learned weights or
        Reciprocal Rank Fusion. Combining keyword overlap with semantic similarity consistently outperforms
        pure vector search on precise factual questions like dates, names, and figures.
      </p>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Where Aktilot sits on the RAG maturity model</h2>
      <p className="mt-3 text-muted">
        Aktilot is architected to evolve toward agentic RAG without a rewrite — the service layer, tool-step
        recording, and response schema are already agent-compatible.
      </p>
      <div className="mt-6 space-y-3">
        {maturityLevels.map((l) => (
          <div
            key={l.level}
            className={`rounded-lg border p-4 ${
              l.current ? "border-brand-violet bg-surface" : "border-border"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted">{l.level}</span>
              <span className="font-semibold">{l.name}</span>
              {l.current && (
                <span className="rounded-full brand-gradient px-2 py-0.5 text-[11px] font-semibold text-white">
                  Aktilot is here
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{l.desc}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
