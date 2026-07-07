import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { docsNav } from "@/lib/site";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="grid gap-10 py-12 lg:grid-cols-[220px_1fr]">
      <aside className="hidden lg:block">
        <nav className="sticky top-24 space-y-1">
          {docsNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </Container>
  );
}
