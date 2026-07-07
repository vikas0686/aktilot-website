"use client";

import { useState } from "react";

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-surface">
      {label && (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="text-xs font-medium text-muted">{label}</span>
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        className="absolute right-3 top-3 rounded-md border border-border bg-background px-2 py-1 text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
        style={label ? { top: "2.5rem" } : undefined}
        aria-label="Copy code"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
