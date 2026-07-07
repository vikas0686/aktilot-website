export type Screenshot = {
  src: string;
  alt: string;
};

export const screenshots: Screenshot[] = [
  { src: "/screenshots/projects.png", alt: "Projects list — organize documents by team, client, or use case" },
  { src: "/screenshots/knowledge-base.png", alt: "Knowledge base upload — drag and drop PDF, TXT, DOC, or DOCX files" },
  { src: "/screenshots/agents-list.png", alt: "Agents list for a project, showing system prompt preview and chunk count" },
  { src: "/screenshots/new-agent.png", alt: "Creating a new agent — name, description, system prompt, and chunks per answer" },
  { src: "/screenshots/chat.png", alt: "Chat interface answering a question with cited source chunks" },
  { src: "/screenshots/temporal-workflows.png", alt: "Temporal UI workflow list showing completed and failed runs" },
  { src: "/screenshots/temporal-chat-workflow.png", alt: "Temporal UI ChatWorkflow trace: keyword extraction through answer generation" },
  { src: "/screenshots/temporal-document-workflow.png", alt: "Temporal UI DocumentWorkflow trace: chunking, embedding, and indexing" },
];
