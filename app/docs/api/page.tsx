import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import {
  IconActivity,
  IconBot,
  IconEye,
  IconFolder,
  IconMessageCircle,
  IconServer,
  IconShield,
  IconUpload,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "API Reference",
  description:
    "REST API reference for Aktilot's FastAPI backend: request/response schemas, path and body parameters, example JSON responses, status codes, and error conditions for projects, files, agents, chat, sessions, and public share links.",
  alternates: { canonical: "/docs/api/" },
};

type Field = { name: string; type: string; desc: string };

type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  pathParams?: Field[];
  body?: { note?: string; fields?: Field[] };
  response: { status: string; example?: string; note?: string };
  errors?: { status: string; desc: string }[];
};

type Group = {
  name: string;
  icon: ReactNode;
  intro?: string;
  endpoints: Endpoint[];
};

// Reused example values so ids/names stay consistent across endpoints below.
const PROJECT_JSON = `{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Support Docs",
  "description": "Internal support knowledge base",
  "created_at": "2026-07-17T10:15:00Z"
}`;

const FILE_PENDING_JSON = `{
  "id": "9c858901-8a57-4791-81fe-4c455b099bc9",
  "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "filename": "handbook.pdf",
  "size": 482913,
  "chunk_status": "pending",
  "chunk_count": 0,
  "uploaded_at": "2026-07-17T10:16:42Z"
}`;

const FILE_LIST_JSON = `[
  {
    "id": "9c858901-8a57-4791-81fe-4c455b099bc9",
    "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "filename": "handbook.pdf",
    "size": 482913,
    "chunk_status": "chunked",
    "chunk_count": 42,
    "uploaded_at": "2026-07-17T10:16:42Z"
  }
]`;

const AGENT_JSON = `{
  "id": "5e9d5a1b-8b8b-4f2d-9a9e-6b2c3f9a7d10",
  "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "Support Bot",
  "description": "Answers questions from the support handbook",
  "system_prompt": "You are a helpful support assistant.",
  "top_k": 4,
  "created_at": "2026-07-17T10:20:00Z",
  "share_slug": null,
  "share_daily_message_cap": null
}`;

const CHAT_RESPONSE_JSON = `{
  "answer": "Full-time employees accrue 15 PTO days per year.",
  "tool_steps": [
    {
      "name": "retrieve_chunks",
      "start_time": "2026-07-17T10:22:01.120Z",
      "end_time": "2026-07-17T10:22:01.340Z",
      "duration_ms": 220.4,
      "input_summary": "query='PTO policy', top_k=4",
      "output_summary": "3 chunks retrieved"
    }
  ],
  "retrieved_chunks": [
    {
      "chunk_id": "c1a2b3c4-d5e6-4f80-9a1b-2c3d4e5f6789",
      "filename": "handbook.pdf",
      "chunk_index": 12,
      "content": "Full-time employees accrue 15 PTO days per year, accrued monthly...",
      "score": 0.87,
      "vec_score": 0.81,
      "bm25_score": 4.2,
      "kw_hits": 2,
      "keywords_matched": ["PTO", "policy"]
    }
  ],
  "keywords": ["PTO", "policy"]
}`;

const MESSAGES_JSON = `[
  {
    "id": "1b2c3d4e-5f60-4182-93a4-b5c6d7e8f901",
    "agent_id": "5e9d5a1b-8b8b-4f2d-9a9e-6b2c3f9a7d10",
    "role": "user",
    "content": "How many PTO days do I get?",
    "created_at": "2026-07-17T10:22:00Z"
  },
  {
    "id": "2c3d4e5f-6071-4293-a4b5-c6d7e8f90123",
    "agent_id": "5e9d5a1b-8b8b-4f2d-9a9e-6b2c3f9a7d10",
    "role": "assistant",
    "content": "Full-time employees accrue 15 PTO days per year.",
    "created_at": "2026-07-17T10:22:01Z"
  }
]`;

const SESSION_JSON = `{
  "id": "7a1b2c3d-4e5f-4071-8293-a4b5c6d7e8f9",
  "agent_id": "5e9d5a1b-8b8b-4f2d-9a9e-6b2c3f9a7d10",
  "title": null,
  "created_at": "2026-07-17T10:21:50Z",
  "updated_at": "2026-07-17T10:21:50Z"
}`;

const SESSION_LIST_JSON = `[
  {
    "id": "7a1b2c3d-4e5f-4071-8293-a4b5c6d7e8f9",
    "agent_id": "5e9d5a1b-8b8b-4f2d-9a9e-6b2c3f9a7d10",
    "title": null,
    "created_at": "2026-07-17T10:21:50Z",
    "updated_at": "2026-07-17T10:21:50Z"
  }
]`;

const SHARE_LINK_JSON = `{
  "share_slug": "support-bot-x7q2",
  "share_path": "/share/support-bot-x7q2",
  "daily_message_cap": 200
}`;

const PUBLIC_AGENT_JSON = `{
  "name": "Support Bot",
  "description": "Answers questions from the support handbook"
}`;

const PUBLIC_CHAT_JSON = `{
  "answer": "Full-time employees accrue 15 PTO days per year."
}`;

const groups: Group[] = [
  {
    name: "Projects",
    icon: <IconFolder className="h-4 w-4" />,
    intro: "A project is a knowledge base: a collection of uploaded files and the agents that query them.",
    endpoints: [
      {
        method: "POST",
        path: "/api/projects",
        summary: "Create a project",
        body: {
          fields: [
            { name: "name", type: "string", desc: "Required." },
            { name: "description", type: "string | null", desc: "Optional." },
          ],
        },
        response: { status: "201 Created", example: PROJECT_JSON },
      },
      {
        method: "GET",
        path: "/api/projects",
        summary: "List all projects",
        response: { status: "200 OK", example: `[\n${PROJECT_JSON}\n]` },
      },
      {
        method: "GET",
        path: "/api/projects/{project_id}",
        summary: "Get a project",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: PROJECT_JSON },
        errors: [{ status: "404", desc: '"Project not found"' }],
      },
      {
        method: "DELETE",
        path: "/api/projects/{project_id}",
        summary: "Delete a project",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        response: { status: "204 No Content" },
        errors: [{ status: "404", desc: '"Project not found"' }],
      },
    ],
  },
  {
    name: "Files",
    icon: <IconUpload className="h-4 w-4" />,
    intro:
      "Uploading a file only writes the record and enqueues ingestion — chunking and embedding happen asynchronously in a Temporal workflow. Poll GET /files or check chunk_status to see when a file is ready to be queried.",
    endpoints: [
      {
        method: "POST",
        path: "/api/projects/{project_id}/files/upload",
        summary: "Upload a file for ingestion",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        body: {
          note: 'multipart/form-data, field name "file". Allowed extensions: .pdf, .txt, .doc, .docx.',
        },
        response: {
          status: "201 Created",
          example: FILE_PENDING_JSON,
          note: 'Returned immediately with chunk_status = "pending" — a Temporal DocumentWorkflow is started in the background and moves it through "chunking" → "chunked" (or "error").',
        },
        errors: [
          { status: "400", desc: "Missing filename, or extension not in the allowed list" },
          { status: "404", desc: '"Project not found"' },
        ],
      },
      {
        method: "GET",
        path: "/api/projects/{project_id}/files",
        summary: "List files in a project",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: FILE_LIST_JSON },
        errors: [{ status: "404", desc: '"Project not found"' }],
      },
      {
        method: "DELETE",
        path: "/api/projects/{project_id}/files/{file_id}",
        summary: "Delete a file",
        pathParams: [
          { name: "project_id", type: "UUID", desc: "" },
          { name: "file_id", type: "UUID", desc: "" },
        ],
        response: { status: "204 No Content" },
        errors: [{ status: "404", desc: '"File not found"' }],
      },
    ],
  },
  {
    name: "Agents",
    icon: <IconBot className="h-4 w-4" />,
    intro:
      "An agent is a configured chat persona scoped to one project: a system prompt plus a top_k that controls how many chunks are retrieved per question.",
    endpoints: [
      {
        method: "POST",
        path: "/api/projects/{project_id}/agents",
        summary: "Create an agent",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        body: {
          fields: [
            { name: "name", type: "string", desc: "Required." },
            { name: "description", type: "string | null", desc: "Optional." },
            { name: "system_prompt", type: "string", desc: 'Optional, defaults to "".' },
            { name: "top_k", type: "int", desc: "Optional, defaults to 2." },
          ],
        },
        response: { status: "201 Created", example: AGENT_JSON },
        errors: [{ status: "404", desc: '"Project not found"' }],
      },
      {
        method: "GET",
        path: "/api/projects/{project_id}/agents",
        summary: "List agents for a project",
        pathParams: [{ name: "project_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: `[\n${AGENT_JSON}\n]` },
        errors: [{ status: "404", desc: '"Project not found"' }],
      },
      {
        method: "GET",
        path: "/api/agents/{agent_id}",
        summary: "Get an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: AGENT_JSON },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
      {
        method: "PUT",
        path: "/api/agents/{agent_id}",
        summary: "Update an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        body: {
          note: "All fields optional — only the ones supplied are changed.",
          fields: [
            { name: "name", type: "string | null", desc: "" },
            { name: "description", type: "string | null", desc: "" },
            { name: "system_prompt", type: "string | null", desc: "" },
            { name: "top_k", type: "int | null", desc: "" },
          ],
        },
        response: { status: "200 OK", example: AGENT_JSON },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
      {
        method: "DELETE",
        path: "/api/agents/{agent_id}",
        summary: "Delete an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "204 No Content" },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
    ],
  },
  {
    name: "Chat",
    icon: <IconMessageCircle className="h-4 w-4" />,
    intro:
      "Chatting runs the durable RAG pipeline synchronously: the request blocks (up to a 2-minute execution timeout) while a Temporal ChatWorkflow retrieves chunks, calls the LLM, and persists the exchange, then returns the full result.",
    endpoints: [
      {
        method: "POST",
        path: "/api/agents/{agent_id}/chat",
        summary: "Chat with an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        body: {
          fields: [
            { name: "question", type: "string", desc: "Required." },
            {
              name: "session_id",
              type: "UUID",
              desc: "Required — create one first via POST /api/agents/{agent_id}/sessions.",
            },
          ],
        },
        response: { status: "200 OK", example: CHAT_RESPONSE_JSON },
        errors: [
          {
            status: "404",
            desc: '"Agent not found", or the session does not belong to this agent (or belongs to a public visitor)',
          },
          { status: "401", desc: "Invalid OpenAI API key" },
          { status: "429", desc: "OpenAI rate limit exceeded" },
          { status: "500", desc: "Chat pipeline failed" },
        ],
      },
      {
        method: "GET",
        path: "/api/agents/{agent_id}/messages",
        summary: "Get full message history for an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: MESSAGES_JSON },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
    ],
  },
  {
    name: "Chat Sessions",
    icon: <IconActivity className="h-4 w-4" />,
    intro: "Sessions group messages into a conversation thread. A session must exist before you can POST a chat message.",
    endpoints: [
      {
        method: "POST",
        path: "/api/agents/{agent_id}/sessions",
        summary: "Create a chat session",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "201 Created", example: SESSION_JSON },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
      {
        method: "GET",
        path: "/api/agents/{agent_id}/sessions",
        summary: "List sessions for an agent",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: SESSION_LIST_JSON },
        errors: [{ status: "404", desc: '"Agent not found"' }],
      },
      {
        method: "GET",
        path: "/api/sessions/{session_id}/messages",
        summary: "Get messages in a session",
        pathParams: [{ name: "session_id", type: "UUID", desc: "" }],
        response: { status: "200 OK", example: MESSAGES_JSON },
        errors: [{ status: "404", desc: '"Chat session not found"' }],
      },
    ],
  },
  {
    name: "Agent Share Links",
    icon: <IconShield className="h-4 w-4" />,
    intro:
      "Lets an agent owner publish a public, unauthenticated chat link for an agent. These endpoints manage the link itself; visitors interact with it through the Public endpoints below.",
    endpoints: [
      {
        method: "POST",
        path: "/api/agents/{agent_id}/share",
        summary: "Create or regenerate the share link",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        body: {
          fields: [
            {
              name: "daily_message_cap",
              type: "int | null",
              desc: "Optional, must be > 0. Overrides the server-wide default daily cap for this agent.",
            },
          ],
        },
        response: {
          status: "200 OK",
          example: SHARE_LINK_JSON,
          note: "Regenerating immediately invalidates the previous slug — visitors holding the old link get a 404.",
        },
      },
      {
        method: "DELETE",
        path: "/api/agents/{agent_id}/share",
        summary: "Revoke the share link",
        pathParams: [{ name: "agent_id", type: "UUID", desc: "" }],
        response: { status: "204 No Content" },
      },
    ],
  },
  {
    name: "Public (share-link visitors)",
    icon: <IconEye className="h-4 w-4" />,
    intro:
      'Unauthenticated routes reached through a share link, resolved by share_slug rather than the internal agent id. On first request, an httpOnly, samesite=lax cookie ("aktilot_vid" by default) is issued with a random visitor UUID; every session and message a visitor creates is scoped to that cookie, so one visitor can never see another\'s conversation. Responses deliberately omit internal fields (project id, system prompt, top_k, retrieved chunks, tool steps) that would leak how the agent or its knowledge base is built.',
    endpoints: [
      {
        method: "GET",
        path: "/api/public/agents/{slug}",
        summary: "Get public agent info",
        pathParams: [{ name: "slug", type: "string", desc: "The agent's share_slug." }],
        response: { status: "200 OK", example: PUBLIC_AGENT_JSON },
      },
      {
        method: "POST",
        path: "/api/public/agents/{slug}/sessions",
        summary: "Create a session as this visitor",
        pathParams: [{ name: "slug", type: "string", desc: "" }],
        response: { status: "201 Created", example: SESSION_JSON },
      },
      {
        method: "GET",
        path: "/api/public/agents/{slug}/sessions",
        summary: "List this visitor's own sessions for the agent",
        pathParams: [{ name: "slug", type: "string", desc: "" }],
        response: { status: "200 OK", example: SESSION_LIST_JSON },
      },
      {
        method: "GET",
        path: "/api/public/agents/{slug}/sessions/{session_id}/messages",
        summary: "Get messages in one of this visitor's sessions",
        pathParams: [
          { name: "slug", type: "string", desc: "" },
          { name: "session_id", type: "UUID", desc: "" },
        ],
        response: { status: "200 OK", example: MESSAGES_JSON },
        errors: [{ status: "404", desc: "Session does not belong to this visitor/agent" }],
      },
      {
        method: "POST",
        path: "/api/public/agents/{slug}/chat",
        summary: "Chat as this visitor",
        pathParams: [{ name: "slug", type: "string", desc: "" }],
        body: {
          fields: [
            { name: "question", type: "string", desc: "Required." },
            { name: "session_id", type: "UUID", desc: "Required." },
          ],
        },
        response: {
          status: "200 OK",
          example: PUBLIC_CHAT_JSON,
          note: "Only { answer }. tool_steps and retrieved_chunks are stripped before this response leaves the server.",
        },
        errors: [
          {
            status: "429",
            desc: 'Hourly visitor cap hit — "You\'ve reached the message limit for this chat. Please try again in a bit." (default 20 messages/visitor/agent/hour)',
          },
          {
            status: "429",
            desc: 'Daily agent-wide cap hit — "This agent has reached its usage limit for today. Please try again later." (default 200/day, or the agent\'s own daily_message_cap)',
          },
        ],
      },
    ],
  },
  {
    name: "System",
    icon: <IconServer className="h-4 w-4" />,
    endpoints: [
      {
        method: "GET",
        path: "/api/health",
        summary: "Health check",
        response: { status: "200 OK", example: `{\n  "status": "ok"\n}` },
      },
    ],
  },
];

const methodStyles: Record<string, { badge: string; text: string; accent: string }> = {
  GET: {
    badge: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/25 dark:text-emerald-400",
    text: "text-emerald-600 dark:text-emerald-400",
    accent: "before:bg-emerald-500/70",
  },
  POST: {
    badge: "bg-blue-500/10 text-blue-700 ring-blue-500/25 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
    accent: "before:bg-blue-500/70",
  },
  PUT: {
    badge: "bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:text-amber-400",
    text: "text-amber-600 dark:text-amber-400",
    accent: "before:bg-amber-500/70",
  },
  DELETE: {
    badge: "bg-rose-500/10 text-rose-700 ring-rose-500/25 dark:text-rose-400",
    text: "text-rose-600 dark:text-rose-400",
    accent: "before:bg-rose-500/70",
  },
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function endpointId(e: Endpoint) {
  return `${e.method.toLowerCase()}-${e.path.replace(/[{}]/g, "").replace(/\//g, "-").replace(/^-+/, "")}`;
}

function Path({ path }: { path: string }) {
  const parts = path.split(/(\{[^}]+\})/g);
  return (
    <span className="font-mono text-sm">
      {parts.map((part, i) =>
        part.startsWith("{") ? (
          <span key={i} className="rounded bg-brand-violet/10 px-1 text-brand-violet dark:text-brand-indigo">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}

function MethodBadge({ method }: { method: Endpoint["method"] }) {
  return (
    <span
      className={`inline-flex w-[52px] shrink-0 items-center justify-center rounded-md px-1.5 py-1 font-mono text-[11px] font-bold ring-1 ring-inset ${methodStyles[method].badge}`}
    >
      {method}
    </span>
  );
}

function FieldsTable({ fields }: { fields: Field[] }) {
  return (
    <div className="mt-1.5 overflow-hidden rounded-md border border-border">
      <table className="w-full text-left text-xs">
        <tbody className="divide-y divide-border">
          {fields.map((f) => (
            <tr key={f.name}>
              <td className="whitespace-nowrap px-3 py-1.5 align-top font-mono font-medium">{f.name}</td>
              <td className="whitespace-nowrap px-3 py-1.5 align-top font-mono text-muted">{f.type}</td>
              <td className="px-3 py-1.5 align-top text-muted">{f.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted/80">
      <span className="h-1 w-1 rounded-full bg-muted/60" />
      {children}
    </p>
  );
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const e = endpoint;
  const style = methodStyles[e.method];
  const id = endpointId(e);
  return (
    <div
      id={id}
      className={`group relative scroll-mt-24 overflow-hidden rounded-xl border border-border bg-background pl-4 transition-colors hover:border-foreground/20 before:absolute before:inset-y-0 before:left-0 before:w-[3px] ${style.accent}`}
    >
      <div className="py-4 pr-4">
        <a href={`#${id}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <MethodBadge method={e.method} />
          <Path path={e.path} />
          <span className="text-sm text-muted">{e.summary}</span>
          <span className="ml-auto hidden font-mono text-xs text-muted/50 group-hover:inline">#</span>
        </a>

        {e.pathParams && e.pathParams.length > 0 && (
          <div className="mt-3">
            <SectionLabel>Path parameters</SectionLabel>
            <FieldsTable fields={e.pathParams} />
          </div>
        )}

        {e.body && (
          <div className="mt-3">
            <SectionLabel>Request body</SectionLabel>
            {e.body.note && <p className="mt-1 text-xs text-muted">{e.body.note}</p>}
            {e.body.fields && <FieldsTable fields={e.body.fields} />}
          </div>
        )}

        <div className="mt-3">
          <div className="flex items-center gap-2">
            <SectionLabel>Response</SectionLabel>
            <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[11px] font-medium ring-1 ring-inset ring-border">
              {e.response.status}
            </span>
          </div>
          {e.response.note && <p className="mt-1.5 text-xs text-muted">{e.response.note}</p>}
          {e.response.example ? (
            <div className="mt-2">
              <CodeBlock code={e.response.example} />
            </div>
          ) : (
            <p className="mt-1.5 text-xs text-muted">No response body.</p>
          )}
        </div>

        {e.errors && e.errors.length > 0 && (
          <div className="mt-3">
            <SectionLabel>Errors</SectionLabel>
            <ul className="mt-1.5 space-y-1">
              {e.errors.map((err) => (
                <li key={err.status + err.desc} className="flex gap-2 text-xs text-muted">
                  <span className="mt-0.5 shrink-0 rounded bg-rose-500/10 px-1.5 py-0.5 font-mono font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/25 dark:text-rose-400">
                    {err.status}
                  </span>
                  <span>{err.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const metaInfo = [
  { label: "Base URL", value: "/api" },
  { label: "Content type", value: "application/json*" },
  { label: "Auth", value: "None (admin routes)" },
];

function Sidebar() {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto pb-10 pr-2">
        {groups.map((group) => (
          <div key={group.name}>
            <a
              href={`#${slugify(group.name)}`}
              className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-brand-violet"
            >
              {group.icon}
              {group.name}
            </a>
            <ul className="space-y-0.5 border-l border-border pl-3">
              {group.endpoints.map((e) => (
                <li key={e.method + e.path}>
                  <a
                    href={`#${endpointId(e)}`}
                    className="flex items-center gap-2 rounded py-1 text-xs text-muted transition-colors hover:text-foreground"
                  >
                    <span className={`w-9 shrink-0 font-mono text-[10px] font-bold ${methodStyles[e.method].text}`}>
                      {e.method}
                    </span>
                    <span className="truncate">{e.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default function ApiPage() {
  return (
    <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[248px_minmax(0,1fr)] xl:gap-14">
      <Sidebar />

      <article className="prose-content min-w-0 max-w-none">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-violet">Reference</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">API Reference</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Aktilot&apos;s backend is a FastAPI application. Interactive OpenAPI docs are always available
          locally at <code className="rounded bg-surface px-1.5 py-0.5">http://localhost:8000/docs</code>.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {metaInfo.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{m.label}</p>
              <p className="mt-1 font-mono text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">
          *except file upload, which is{" "}
          <code className="rounded bg-surface px-1 py-0.5">multipart/form-data</code>. There is no
          authentication layer on the admin routes in this open-source build — put them behind your own
          auth/proxy before exposing the API publicly. The <strong className="text-foreground">Public</strong>{" "}
          group below is the one exception: it&apos;s designed to be exposed directly, scoped per-visitor by
          cookie, and rate-limited.
        </p>

        <nav className="mt-8 flex flex-wrap gap-2 border-y border-border py-4 lg:hidden">
          {groups.map((g) => (
            <a
              key={g.name}
              href={`#${slugify(g.name)}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {g.icon}
              {g.name}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <div key={group.name} id={slugify(group.name)} className="scroll-mt-24">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-foreground">
                  {group.icon}
                </span>
                <h2 className="text-lg font-bold tracking-tight">{group.name}</h2>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-muted ring-1 ring-inset ring-border">
                  {group.endpoints.length} {group.endpoints.length === 1 ? "endpoint" : "endpoints"}
                </span>
              </div>
              {group.intro && <p className="mt-2 max-w-2xl text-sm text-muted">{group.intro}</p>}
              <div className="mt-4 space-y-3">
                {group.endpoints.map((e) => (
                  <EndpointCard key={e.method + e.path} endpoint={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
