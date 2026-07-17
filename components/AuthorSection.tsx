import Image from "next/image";
import { Container } from "./ui";
import { teamMembers } from "@/lib/site";

export function AuthorSection() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">Who&apos;s behind this</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">Built by engineers who&apos;ve paid the price of complexity</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-violet/40"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{member.bio}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2">
                  {member.links.map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-brand-violet hover:underline"
                      >
                        {link.label}
                      </a>
                      {index < member.links.length - 1 && (
                        <span className="mx-2 text-base font-bold text-muted">&middot;</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
