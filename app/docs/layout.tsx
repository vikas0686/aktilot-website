import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return <Container className="py-12">{children}</Container>;
}
