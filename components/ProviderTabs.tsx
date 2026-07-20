"use client";

import { useState } from "react";
import { CodeBlock } from "./CodeBlock";

type Tab = {
  id: string;
  label: string;
  code: string;
  codeLabel?: string;
};

export function ProviderTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              active === tab.id
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {active === tab.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <CodeBlock code={current.code} label={current.codeLabel} />
      </div>
    </div>
  );
}
