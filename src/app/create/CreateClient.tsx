"use client";

import { useState } from "react";
import UserMenu from "@/components/UserMenu";
import Link from "next/link";

export default function CreatePage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Top User Menu */}
      <div className="absolute right-6 top-6 z-20">
        <UserMenu />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">

        {/* Main Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-zinc-700">

          {/* Heading */}
          <div className="text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 text-2xl shadow-lg transition duration-500 hover:scale-110 hover:rotate-3">
              🔗
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Create Short URL
            </h1>

            <p className="mt-3 text-zinc-400">
              Turn your long URL into a clean, shareable link
            </p>

            <Link
              href="/dashboard"
              className="mt-4 inline-block text-sm text-zinc-500 transition duration-300 hover:text-white hover:-translate-x-1"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Input Area */}
          <div className="mt-8">

            <div className="group flex flex-col gap-3 sm:flex-row">

              <input
                type="url"
                placeholder="https://example.com/your-long-url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError("");
                }}
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950/80 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-zinc-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                disabled={loading}
                className="flex min-w-[130px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-black shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={async () => {
                  setError("");
                  setShortUrl("");
                  setLoading(true);

                  try {
                    const response = await fetch("/api/shorten", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ url }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      setError(data.error);
                      return;
                    }

                    setShortUrl(data.shortCode);
                  } catch {
                    setError("Something went wrong. Please try again.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-black" />
                    Shortening...
                  </>
                ) : (
                  "Shorten"
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                ❌ {error}
              </div>
            )}
          </div>

          {/* Result */}
          {shortUrl && (
            <div className="mt-6 animate-pulse rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">

              <p className="text-center text-sm text-zinc-400">
                Your short URL is ready 🚀
              </p>

              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">

                <a
                  href={`/${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="max-w-full break-all text-center text-lg font-semibold text-blue-400 transition duration-300 hover:text-blue-300 hover:underline"
                >
                  http://localhost:3000/{shortUrl}
                </a>

                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      `http://localhost:3000/${shortUrl}`
                    );

                    setCopied(true);

                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  }}
                  className="shrink-0 cursor-pointer rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-700"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>

              </div>
            </div>
          )}

        </div>

        {/* Bottom Text */}
        <p className="mt-5 text-center text-xs text-zinc-600">
          Fast • Simple • Secure URL shortening
        </p>

      </div>
    </main>
  );
}