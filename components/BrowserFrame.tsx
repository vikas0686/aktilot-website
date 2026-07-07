import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  width,
  height,
  priority,
  url = "localhost:3000",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  url?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/10 dark:shadow-black/40">
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 truncate rounded-md bg-background px-3 py-1 text-center text-xs text-muted">
          {url}
        </div>
      </div>
      <Image src={src} alt={alt} width={width} height={height} priority={priority} className="w-full" />
    </div>
  );
}
