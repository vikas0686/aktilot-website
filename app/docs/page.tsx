import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Getting Started",
  description:
    "Install and run Aktilot with Docker Compose in minutes, or set up a local development environment for the FastAPI backend and React frontend.",
  alternates: { canonical: "/docs/" },
};

const dockerQuickStart = `git clone ${siteConfig.githubUrl}.git
cd Aktilot

cp .env.example .env
# Open .env and set: OPENAI_API_KEY=sk-...

docker compose up --build`;

const backendSetup = `cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env   # set OPENAI_API_KEY and DATABASE_URL

# Start Postgres and Temporal via Docker
docker compose up postgres temporal -d

alembic upgrade head

# Terminal 1 — API server
uvicorn main:app --reload --port 8000

# Terminal 2 — Temporal worker (processes document uploads)
python -m temporal.worker`;

const frontendSetup = `cd frontend
npm install
npm run dev   # http://localhost:5173`;

const testCommands = `# Backend
cd backend && source .venv/bin/activate
pytest --tb=short -q

# Frontend
cd frontend && npm test`;

const services = [
  { name: "App", url: "http://localhost:3000", purpose: "Main UI" },
  { name: "Backend API", url: "http://localhost:8000", purpose: "REST API + OpenAPI docs at /docs" },
  { name: "Temporal UI", url: "http://localhost:8233", purpose: "Workflow execution history and retries" },
  { name: "Grafana", url: "http://localhost:3002", purpose: "Observability dashboards (admin / admin)" },
  { name: "Prometheus", url: "http://localhost:9090", purpose: "Metrics query engine" },
];

const envVars = [
  { name: "OPENAI_API_KEY", required: "Yes", desc: "Your OpenAI API key" },
  { name: "DATABASE_URL", required: "Yes", desc: "PostgreSQL connection string (asyncpg)" },
  { name: "TEMPORAL_ADDRESS", required: "No", desc: "Temporal server address (default: localhost:7233)" },
  { name: "CHAT_MODEL", required: "No", desc: "Chat model to use (default: gpt-4o-mini)" },
  { name: "EMBEDDING_MODEL", required: "No", desc: "Embedding model (default: text-embedding-3-small)" },
  { name: "UPLOAD_DIR", required: "No", desc: "Where uploaded files are stored (default: uploads)" },
  { name: "CHROMA_DIR", required: "No", desc: "Where vector data is persisted (default: chroma_data)" },
];

export default function GettingStartedPage() {
  return (
    <article className="prose-content max-w-none">
      <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
      <p className="mt-3 text-muted">
        The fastest way to run Aktilot is with Docker Compose. You need an{" "}
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-violet hover:underline"
        >
          OpenAI API key
        </a>{" "}
        and Docker installed.
      </p>

      <div className="mt-6">
        <CodeBlock code={dockerQuickStart} label="Terminal" />
      </div>

      <p className="mt-6 text-sm text-muted">
        That&apos;s it. Create a project, upload a PDF, create an agent, and start asking questions. The
        Temporal UI at <code className="rounded bg-surface px-1.5 py-0.5">:8233</code> lets you monitor
        document processing jobs, inspect individual pipeline steps, and retry failed uploads without
        re-uploading the file.
      </p>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Services</h2>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-2 font-semibold">Service</th>
              <th className="px-4 py-2 font-semibold">URL</th>
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

      <h2 className="mt-12 text-xl font-bold tracking-tight">Local Development</h2>
      <p className="mt-3 text-muted">
        <strong>Prerequisites:</strong> Python 3.12+, Node 20+, Docker (for Postgres + Temporal)
      </p>

      <h3 className="mt-6 text-base font-semibold">Backend</h3>
      <div className="mt-3">
        <CodeBlock code={backendSetup} label="Terminal" />
      </div>

      <h3 className="mt-8 text-base font-semibold">Frontend</h3>
      <div className="mt-3">
        <CodeBlock code={frontendSetup} label="Terminal" />
      </div>

      <h3 className="mt-8 text-base font-semibold">Tests</h3>
      <div className="mt-3">
        <CodeBlock code={testCommands} label="Terminal" />
      </div>

      <h2 className="mt-12 text-xl font-bold tracking-tight">Environment Variables</h2>
      <p className="mt-3 text-muted">
        Copy <code className="rounded bg-surface px-1.5 py-0.5">.env.example</code> to{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">.env</code> in the project root (for Docker) or{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">backend/.env</code> (for local dev).
      </p>
      <div className="mt-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface">
            <tr>
              <th className="px-4 py-2 font-semibold">Variable</th>
              <th className="px-4 py-2 font-semibold">Required</th>
              <th className="px-4 py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            {envVars.map((v) => (
              <tr key={v.name} className="border-t border-border">
                <td className="px-4 py-2 font-mono text-xs">{v.name}</td>
                <td className="px-4 py-2 text-muted">{v.required}</td>
                <td className="px-4 py-2 text-muted">{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
