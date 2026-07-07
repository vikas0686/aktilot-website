import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto max-w-6xl px-6 ${className ?? ""}`}>{children}</div>;
}

export function Prose({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={`prose-content max-w-none text-[15px] leading-7 text-foreground/90 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-violet/40">
      {icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg brand-gradient text-white">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{children}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border py-14">
      <Container>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
      </Container>
    </div>
  );
}
