import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      backgroundColor: "#1a1a1a",
      color: "#FFF5EA",
    }}>
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
        style={{
          fontFamily: "monospace",
          fontSize: "0.875rem",
          border: "1px solid rgba(255, 245, 234, 0.4)",
          padding: "0.75rem 1.5rem",
          borderRadius: "0.25rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Back to Portfolio
      </Link>
    </main>
  );
}
