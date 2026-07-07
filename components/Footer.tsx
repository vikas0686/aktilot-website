import Link from "next/link";
import { Logo } from "./Logo";
import { authorConfig, docsNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted">{siteConfig.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Docs</h3>
            <ul className="mt-3 space-y-2">
              {docsNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.githubIssuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Report an issue
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.githubDiscussionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Discussions
                </a>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Project</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={`${siteConfig.githubUrl}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {siteConfig.license} License
                </a>
              </li>
              <li>
                <a
                  href={`${siteConfig.githubUrl}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Contributing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a href={authorConfig.links[0].href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              {siteConfig.author}
            </a>
            . Released under the {siteConfig.license} license.
          </p>
          <p>Aktilot is open source and not affiliated with OpenAI, Temporal Technologies, or Chroma.</p>
        </div>
      </div>
    </footer>
  );
}
