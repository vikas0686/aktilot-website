export const siteConfig = {
  name: "Aktilot",
  tagline: "Chat with your documents. On your infrastructure.",
  description:
    "Aktilot is a self-hosted, open-source RAG platform for chatting with your documents. Hybrid BM25 + vector retrieval, durable Temporal workflows, full observability, and cited answers — all running on your own infrastructure. No data leaves your servers.",
  url: "https://aktilot.com",
  githubUrl: "https://github.com/vikas0686/Aktilot",
  githubIssuesUrl: "https://github.com/vikas0686/Aktilot/issues",
  githubDiscussionsUrl: "https://github.com/vikas0686/Aktilot/discussions",
  license: "MIT",
  author: "Vikas Pandey",
  keywords: [
    "Aktilot",
    "RAG",
    "retrieval augmented generation",
    "open source RAG",
    "self-hosted AI",
    "chat with documents",
    "document AI",
    "Temporal workflows",
    "vector search",
    "BM25",
    "ChromaDB",
    "LLM observability",
    "AI agents",
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/architecture", label: "Architecture" },
  { href: "/docs/observability", label: "Observability" },
  { href: "/blog", label: "Blog" },
] as const;

export const docsNav = [
  { href: "/docs", label: "Getting Started" },
  { href: "/docs/architecture", label: "Architecture" },
  { href: "/docs/observability", label: "Observability" },
  { href: "/docs/api", label: "API Reference" },
] as const;
