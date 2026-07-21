import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Observability",
  description:
    "Aktilot's full observability stack: OpenTelemetry, Prometheus, and Grafana Tempo powering 7 pre-built dashboards for LLM performance, retrieval quality, cost, and Temporal workflow execution.",
  alternates: { canonical: "/docs/observability/" },
};

const services = [
  { name: "Grafana", url: "http://localhost:3002", purpose: "Dashboards (metrics + traces)" },
  { name: "Prometheus", url: "http://localhost:9090", purpose: "Metrics store + query engine" },
  { name: "Grafana Tempo", url: "http://localhost:3200", purpose: "Distributed trace storage" },
  { name: "OTEL Collector", url: "http://localhost:8889/metrics", purpose: "Raw metrics scrape endpoint" },
  { name: "Temporal UI", url: "http://localhost:8233", purpose: "Workflow execution history" },
];

const dashboards = [
  {
    name: "RAG Pipeline Overview",
    path: "/d/rag-overview",
    desc: "Your first stop. Answers “is the system healthy right now?” — LLM response latency, chat volume, average retrieval top-1 score, and an activity latency breakdown showing which pipeline step is the bottleneck.",
  },
  {
    name: "Retrieval Quality",
    path: "/d/retrieval-quality",
    desc: "Open this when answers feel irrelevant. Reranker top-1 score over time, docs discarded ratio, retrieval score by type (hybrid vs. vector vs. BM25), and top-K requested vs. returned.",
  },
  {
    name: "Prompt Intelligence",
    path: "/d/prompt-intelligence",
    desc: "Open this when token costs spike. Stacked prompt token composition (context / system / question), context tokens by project, and chunks included vs. top-K requested.",
  },
  {
    name: "LLM Performance",
    path: "/d/llm-performance",
    desc: "Open this when LLM calls feel slow. Response latency by purpose, finish-reason distribution, and requests by purpose to catch silently failing steps.",
  },
  {
    name: "Vector DB Health",
    path: "/d/vectordb-health",
    desc: "Open this after uploading documents. Collection size over time, queries by collection, and search/insert latency.",
  },
  {
    name: "Token & Cost Intelligence",
    path: "/d/token-cost",
    desc: "Open this at end of month. Cumulative input/output tokens by model and purpose, embedding tokens by call site, and the input/output token ratio.",
  },
  {
    name: "Temporal Workflows",
    path: "/d/temporal-workflows",
    desc: "Open this when workflows are slow or failing. Activities executed, retries, terminal failures, activity latency by type, worker task-slot saturation, and queue delay.",
  },
];

const metricPrefixes = [
  { prefix: "rag_llm_*", source: "Chat activities", examples: "rag_llm_request_latency_ms, rag_llm_requests_total" },
  { prefix: "rag_embedding_*", source: "Embedding calls", examples: "rag_embedding_latency_ms, rag_embedding_tokens_total" },
  { prefix: "rag_retrieval_*", source: "Vector + BM25 search", examples: "rag_retrieval_top_k_returned, rag_retrieval_score_avg" },
  { prefix: "rag_reranker_*", source: "Hybrid reranking", examples: "rag_reranker_score_top1, rag_reranker_latency_ms" },
  { prefix: "rag_prompt_*", source: "Prompt assembly", examples: "rag_prompt_tokens_context, rag_prompt_chunks_included" },
  { prefix: "rag_vectordb_*", source: "ChromaDB operations", examples: "rag_vectordb_collection_size, rag_vectordb_search_latency_ms" },
  { prefix: "rag_tokens_*", source: "Cost tracking", examples: "rag_tokens_input_total, rag_tokens_embedding_total" },
  { prefix: "rag_workflow_*", source: "Temporal activities", examples: "rag_workflow_activity_duration_ms, rag_workflow_retries_total" },
  { prefix: "temporal_*", source: "Temporal SDK", examples: "temporal_activity_execution_latency, temporal_worker_task_slots_available" },
];

export default function ObservabilityPage() {
  return (
    <article className="prose-content max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">Observability</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Aktilot ships with a full observability stack out of the box. Every component of the RAG pipeline —
        from document ingestion to LLM calls to ChromaDB queries — is instrumented with OpenTelemetry and
        visualised in Grafana. The stack starts automatically with{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">docker compose up</code>; no additional setup is
        required.
      </p>

      <div className="mt-6 max-w-2xl rounded-lg border border-border bg-surface p-5 font-mono text-xs leading-6 text-muted">
        Aktilot (API + Worker)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;│ OTLP/gRPC
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;▼
        <br />
        OpenTelemetry Collector
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;├──► Prometheus (metrics)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;└──► Grafana Tempo (traces) ──► Grafana (dashboards)
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Services</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-2 font-semibold">Service</th>
              <th className="px-4 py-2 font-semibold">Local URL</th>
              <th className="px-4 py-2 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.name} className="border-t border-border">
                <td className="px-4 py-2 font-medium">{s.name}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted">{s.url}</td>
                <td className="px-4 py-2 text-muted">{s.purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-muted">
        Default Grafana login: <strong>admin / admin</strong>
      </p>

      <h2 className="mt-12 text-xl font-bold tracking-tight">7 pre-built dashboards</h2>
      <div className="mt-6 space-y-5">
        {dashboards.map((d, i) => (
          <div key={d.name} className="rounded-lg border border-border p-5">
            <h3 className="font-semibold">
              {i + 1}. {d.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-violet-600 dark:text-violet-400">{d.path}</p>
            <p className="mt-2 text-sm text-muted">{d.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Traces</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Every API request and Temporal workflow activity is traced end to end and stored in Grafana Tempo.
        Traces link API requests → workflow executions → individual activity spans, so you can follow a single
        user query from the HTTP endpoint through every pipeline step. Open Grafana → Explore → select the
        Tempo datasource, then search by service name: <code className="rounded bg-surface px-1.5 py-0.5">aktilot-api</code>{" "}
        or <code className="rounded bg-surface px-1.5 py-0.5">aktilot-worker</code>.
      </p>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Metrics reference</h2>
      <p className="mt-3 max-w-2xl text-muted">
        All custom metrics use the <code className="rounded bg-surface px-1.5 py-0.5">rag.*</code> prefix and
        are exported via OTLP to the collector. Temporal SDK built-in metrics use the{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">temporal_*</code> prefix.
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-2 font-semibold">Prefix</th>
              <th className="px-4 py-2 font-semibold">Source</th>
              <th className="px-4 py-2 font-semibold">Examples</th>
            </tr>
          </thead>
          <tbody>
            {metricPrefixes.map((m) => (
              <tr key={m.prefix} className="border-t border-border">
                <td className="px-4 py-2 font-mono text-xs">{m.prefix}</td>
                <td className="px-4 py-2 text-muted">{m.source}</td>
                <td className="px-4 py-2 font-mono text-xs text-muted">{m.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
