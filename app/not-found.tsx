import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-violet">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or has moved.
      </p>
      <Link
        href="/"
        className="brand-gradient mt-8 flex h-11 items-center rounded-md px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
}
