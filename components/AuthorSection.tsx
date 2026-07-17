import Image from "next/image";
import { Container } from "./ui";
import { teamMembers } from "@/lib/site";

export function AuthorSection() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">Who&apos;s behind this</p>
          <div className="mt-6 space-y-10">
            {teamMembers.map((member) => (
              <div key={member.name} className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">{member.name}</h2>
                  <p className="text-sm text-muted">{member.role}</p>
                  <p className="mt-4 text-sm leading-6 text-muted">{member.bio}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-2">
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
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
