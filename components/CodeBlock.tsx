"use client";

import { useState } from "react";
import { IconCheck } from "./icons";

function Line({ text }: { text: string }) {
  const isComment = /^\s*#/.test(text);
  return <div className={isComment ? "text-zinc-500" : undefined}>{text || " "}</div>;
}

export function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          {label && <span className="text-xs font-medium text-zinc-400">{label}</span>}
        </div>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
              Copied
            </>
          ) : (
            "Copy"
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono">
          {code.split("\n").map((line, i) => (
            <Line key={i} text={line} />
          ))}
        </code>
      </pre>
    </div>
  );
}
