import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-background text-foreground">
      <p style={{ fontFamily: "monospace", fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "1rem" }}>
        404
      </p>
      <h1 style={{ fontFamily: "serif", fontSize: "clamp(3rem, 8vw, 4.5rem)", marginBottom: "1.5rem" }}>
        Blank Film
      </h1>
      <p style={{ fontFamily: "monospace", fontSize: "1rem", maxWidth: "28rem", opacity: 0.8, marginBottom: "2.5rem" }}>
        This frame was never developed. Maybe one day it will be.
      </p>
      <Link
        href="/"
        className="font-mono text-sm border border-foreground/40 px-6 py-3 rounded text-inherit no-underline"
      >
        Back to Portfolio
      </Link>
    </main>
  );
}
