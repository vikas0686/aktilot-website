export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ai-pipelines-need-workflow-level-observability",
    title: "Why AI Pipelines Need Workflow-Level Observability",
    description:
      "A healthy request can still be a wrong answer. Why request-level monitoring isn't enough for RAG pipelines, and what workflow-level observability looks like in practice.",
    date: "2026-07-02",
  },
];
