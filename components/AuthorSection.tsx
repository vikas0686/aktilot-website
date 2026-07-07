import Image from "next/image";
import { Container } from "./ui";
import { authorConfig } from "@/lib/site";

export function AuthorSection() {
  return (
    <section className="border-b border-border py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">Who&apos;s behind this</p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border">
              <Image
                src={authorConfig.photo}
                alt={authorConfig.name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">{authorConfig.name}</h2>
              <p className="text-sm text-muted">{authorConfig.role}</p>
              <p className="mt-4 text-sm leading-6 text-muted">{authorConfig.bio}</p>
              <div className="mt-5 flex flex-wrap gap-4">
                {authorConfig.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand-violet hover:underline"
                  >
                    {link.label} |
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
