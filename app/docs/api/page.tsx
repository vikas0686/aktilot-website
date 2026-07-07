import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "REST API reference for Aktilot's FastAPI backend: projects, files, agents, chat sessions, and the ChatRequest/ChatResponse schema.",
  alternates: { canonical: "/docs/api/" },
};

const endpointGroups = [
  {
    name: "Projects",
    endpoints: [
      { method: "POST", path: "/projects", desc: "Create a project" },
      { method: "GET", path: "/projects", desc: "List projects" },
      { method: "GET", path: "/projects/{project_id}", desc: "Get a project" },
      { method: "DELETE", path: "/projects/{project_id}", desc: "Delete a project" },
    ],
  },
  {
    name: "Files",
    endpoints: [
      { method: "POST", path: "/projects/{project_id}/files", desc: "Upload a file for ingestion" },
      { method: "GET", path: "/projects/{project_id}/files", desc: "List files in a project" },
      { method: "DELETE", path: "/projects/{project_id}/files/{file_id}", desc: "Delete a file" },
    ],
  },
  {
    name: "Agents",
    endpoints: [
      { method: "POST", path: "/projects/{project_id}/agents", desc: "Create an agent" },
      { method: "GET", path: "/projects/{project_id}/agents", desc: "List agents for a project" },
      { method: "GET", path: "/agents/{agent_id}", desc: "Get an agent" },
      { method: "PUT", path: "/agents/{agent_id}", desc: "Update an agent" },
      { method: "DELETE", path: "/agents/{agent_id}", desc: "Delete an agent" },
    ],
  },
  {
    name: "Chat",
    endpoints: [
      { method: "POST", path: "/agents/{agent_id}/chat", desc: "Chat with an agent" },
      { method: "GET", path: "/agents/{agent_id}/messages", desc: "Get message history" },
      { method: "POST", path: "/agents/{agent_id}/sessions", desc: "Create a chat session" },
      { method: "GET", path: "/agents/{agent_id}/sessions", desc: "List sessions for an agent" },
      { method: "GET", path: "/sessions/{session_id}/messages", desc: "Get messages in a session" },
    ],
  },
  {
    name: "System",
    endpoints: [{ method: "GET", path: "/api/health", desc: "Health check" }],
  },
];

const chatSchema = `class ChatRequest(BaseModel):
    question: str
    session_id: uuid.UUID

class ChatResponse(BaseModel):
    answer: str
    tool_steps: list[ToolStep]
    retrieved_chunks: list[RetrievedChunk]
    keywords: list[str] = []

class RetrievedChunk(BaseModel):
    chunk_id: str
    filename: str
    chunk_index: int
    content: str
    score: float           # final hybrid score
    vec_score: float = 0.0  # cosine similarity component
    bm25_score: float = 0.0 # BM25 component
    kw_hits: int = 0
    keywords_matched: list[str] = []

class AgentCreate(BaseModel):
    name: str
    description: str | None = None
    system_prompt: str = ""
    top_k: int = 2`;

const methodColor: Record<string, string> = {
  GET: "text-emerald-600 dark:text-emerald-400",
  POST: "text-blue-600 dark:text-blue-400",
  PUT: "text-amber-600 dark:text-amber-400",
  DELETE: "text-rose-600 dark:text-rose-400",
};

export default function ApiPage() {
  return (
    <article className="prose-content max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">API Reference</h1>
      <p className="mt-3 text-muted">
        Aktilot&apos;s backend is a FastAPI application. When running locally, interactive OpenAPI docs are
        always available at{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">http://localhost:8000/docs</code>. The endpoints
        below are grouped by resource.
      </p>

      <div className="mt-8 space-y-8">
        {endpointGroups.map((group) => (
          <div key={group.name}>
            <h2 className="text-lg font-bold tracking-tight">{group.name}</h2>
            <div className="mt-3 overflow-hidden rounded-lg border border-border">
              {group.endpoints.map((e, i) => (
                <div
                  key={e.path + e.method}
                  className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <span className={`w-16 shrink-0 font-mono text-xs font-bold ${methodColor[e.method]}`}>
                    {e.method}
                  </span>
                  <span className="font-mono text-sm">{e.path}</span>
                  <span className="text-sm text-muted sm:ml-auto">{e.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Chat request &amp; response schema</h2>
      <p className="mt-3 text-muted">
        Every chat response includes the retrieved chunks it was built from — filename, chunk position, and
        both the hybrid and component (vector / BM25) scores — so answers are always traceable back to a
        source.
      </p>
      <div className="mt-4">
        <CodeBlock code={chatSchema} label="backend/models/schemas.py" />
      </div>
    </article>
  );
}
