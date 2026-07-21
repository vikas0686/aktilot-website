import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { IconCheck, IconGithub, IconGitlab, IconJira, IconSlack } from "@/components/icons";
import { connectors, siteConfig, type Connector } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connectors",
  description:
    "Pull knowledge directly from the tools your team already uses. GitHub is available now, with GitLab, Jira, and Slack on the way.",
  alternates: { canonical: "/connectors/" },
};

const icons: Record<Connector["id"], typeof IconGithub> = {
  github: IconGithub,
  gitlab: IconGitlab,
  jira: IconJira,
  slack: IconSlack,
};

export default function ConnectorsPage() {
  const available = connectors.filter((c) => c.status === "available");
  const comingSoon = connectors.filter((c) => c.status === "coming-soon");

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Connectors"
        description="Pull knowledge directly from the tools your team already uses — indexed into the same searchable vector store as your uploaded documents."
      />
      <Container className="py-14">
        <div className="space-y-6">
          {available.map((connector) => {
            const Icon = icons[connector.id];
            return (
              <div key={connector.id} className="rounded-xl border border-border bg-surface p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg brand-gradient text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">{connector.name}</h2>
                      <p className="mt-0.5 text-sm text-muted">{connector.tagline}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available now
                  </span>
                </div>

                <p className="mt-6 text-sm leading-6 text-foreground/90">{connector.description}</p>

                {connector.features && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {connector.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-muted">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-violet" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {connector.docsHref && (
                  <a
                    href={`${siteConfig.githubUrl}${connector.docsHref}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-violet hover:underline"
                  >
                    Read the setup guide &rarr;
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <h2 className="mt-16 text-lg font-bold tracking-tight">Coming soon</h2>
        <p className="mt-2 text-sm text-muted">More sources are on the way. Want one sooner? Open an issue on GitHub.</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {comingSoon.map((connector) => {
            const Icon = icons[connector.id];
            return (
              <div key={connector.id} className="rounded-xl border border-dashed border-border p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface text-foreground/70">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{connector.name}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{connector.description}</p>
                <span className="mt-4 inline-block rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted">
                  Coming soon
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
