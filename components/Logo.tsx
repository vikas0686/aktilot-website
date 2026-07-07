export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="aktilot-bg" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#aktilot-bg)" />
      <path
        d="M7.5 25 L14.5 8 L21.5 25"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="10.6" y1="18" x2="18.4" y2="18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M25.5 5.5 L26.5 8.5 L29.5 9.5 L26.5 10.5 L25.5 13.5 L24.5 10.5 L21.5 9.5 L24.5 8.5 Z"
        fill="#e879f9"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold ${className ?? ""}`}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="text-lg tracking-tight">Aktilot</span>
    </span>
  );
}
