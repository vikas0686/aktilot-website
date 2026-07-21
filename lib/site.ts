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

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  links: readonly { label: string; href: string }[];
};

export const teamMembers: readonly TeamMember[] = [
  {
    name: "Vikas Pandey",
    role: "Principal Engineer",
    photo: "/team/vikas-pandey.png",
    bio: "Vikas is a software engineer and payments architect with 17+ years building infrastructure that moves money reliably at scale — UPI, card processing, and distributed systems that can't afford to be wrong. Aktilot applies that same discipline to RAG: durable, checkpointed workflows instead of fire-and-forget scripts, and full observability instead of a black box.",
    links: [
      { label: "Personal site", href: "https://vikaspandey.dev" },
      { label: "GitHub", href: "https://github.com/vikas0686" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/vikas-pandey-76904817/" },
      { label: "Medium", href: "https://medium.com/@vikas.pandey4" },
    ],
  },
  {
    name: "Kush Saraiya",
    role: "Principal Consultant",
    photo: "/team/kush.jpeg",
    bio: "Kush brings 17+ years of engineering judgement to Aktilot — from distributed systems and platform modernisation to the kind of architectural decisions that look simple on a whiteboard and expensive in production. His focus on observability, durable workflows, and systems that don't hide their failures shapes how Aktilot is designed from the ground up.",
    links: [
      { label: "Personal site", href: "https://kushsaraiya.com" },
      { label: "GitHub", href: "https://github.com/saraiyakush" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kushsaraiya/" },
    ],
  },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/docs/architecture", label: "Architecture" },
  { href: "/docs/observability", label: "Observability" },
  { href: "/connectors", label: "Connectors" },
  { href: "/docs/api", label: "API Reference" },
  { href: "/blog", label: "Blog" },
] as const;

export type Connector = {
  id: "github" | "gitlab" | "jira" | "slack";
  name: string;
  status: "available" | "coming-soon";
  tagline: string;
  description: string;
  features?: readonly string[];
  docsHref?: string;
};

export const connectors: readonly Connector[] = [
  {
    id: "github",
    name: "GitHub",
    status: "available",
    tagline: "Sync an entire repo — code and issues — into your project's knowledge base.",
    description:
      "Install a GitHub App, pick a repository, and Aktilot pulls in file contents plus every issue and its comments — indexed into the same searchable vector store as your uploaded documents, kept as a clearly separate, independently-syncable source.",
    features: [
      "Full repo + issues ingestion — code, docs, and issue threads (with comments) indexed side-by-side with uploads",
      "Durable Temporal sync — GithubSyncWorkflow checkpoints every step, so a rate limit mid-sync only retries that step",
      "Bring your own GitHub App — self-hosted, so each deployment installs its own App with read-only Contents + Issues access",
      "Manual full re-sync — click Sync to clear old chunks and re-pull everything fresh (no webhooks in this version)",
    ],
    docsHref: "/blob/main/docs/GITHUB_CONNECTOR.md",
  },
  {
    id: "gitlab",
    name: "GitLab",
    status: "coming-soon",
    tagline: "Sync GitLab repositories and issues the same way as GitHub.",
    description:
      "Project and group repositories, plus issues and merge request discussions, indexed into your knowledge base.",
  },
  {
    id: "jira",
    name: "Jira",
    status: "coming-soon",
    tagline: "Bring your team's tickets and epics into agent context.",
    description: "Projects, issues, and comments — searchable alongside your documents and code.",
  },
  {
    id: "slack",
    name: "Slack",
    status: "coming-soon",
    tagline: "Index conversations from the channels that matter.",
    description: "Channel history and threads, so agents can answer questions your team already discussed.",
  },
] as const;

export const docsNav = [
  { href: "/docs", label: "Getting Started" },
  { href: "/docs/architecture", label: "Architecture" },
  { href: "/docs/observability", label: "Observability" },
  { href: "/docs/api", label: "API Reference" },
] as const;
