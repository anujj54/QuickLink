"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

type ShortUrl = {
  id: number;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
};

export default function Dashboard() {
  const [urls, setUrls] = useState<ShortUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await fetch("/api/urls");
        const data = await response.json();

        if (!response.ok) {
          console.error(data.error);
          setUrls([]);
          return;
        }

        setUrls(data);
      } catch (error) {
        console.error(error);
        setUrls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const totalClicks = urls.reduce(
    (total, url) => total + url.clicks,
    0
  );

  const copyUrl = async (url: ShortUrl) => {
    await navigator.clipboard.writeText(
      `http://localhost:3000/${url.shortCode}`
    );

    setCopiedId(url.id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const deleteUrl = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this URL?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/urls/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setUrls((currentUrls) =>
        currentUrls.filter((url) => url.id !== id)
      );
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />

          <p className="mt-4 text-sm text-zinc-500">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 p-6 text-white sm:p-8">

      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-6">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-xl shadow-lg">
                🔗
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  QuickLink
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  Manage and track your shortened URLs
                </p>
              </div>
            </div>
          </div>

          <UserMenu />
        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Total URLs */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-zinc-700">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Total URLs
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {urls.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl transition duration-300 group-hover:scale-110">
                🔗
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-600">
              Short links created
            </p>
          </div>

          {/* Total Clicks */}
          <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-zinc-700">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-500">
                  Total Clicks
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {totalClicks}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-xl transition duration-300 group-hover:scale-110">
                📈
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-600">
              Total visits across your links
            </p>
          </div>
        </div>

        {/* URLs Header */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Your Short URLs
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage all your shortened links
            </p>
          </div>

          <Link
            href="/create"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-white/10"
          >
            <span className="text-lg transition duration-300 group-hover:rotate-90">
              +
            </span>

            Create Short URL
          </Link>
        </div>

        {/* URLs */}
        <div className="space-y-4">

          {urls.map((url) => (
            <div
              key={url.id}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                {/* URL Information */}
                <div className="min-w-0 flex-1">

                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                    Original URL
                  </p>

                  <p className="break-all text-sm text-zinc-300 sm:text-base">
                    {url.originalUrl}
                  </p>

                  {/* Short URL */}
                  <div className="mt-5">

                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-600">
                      Short URL
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                      <a
                        href={`/${url.shortCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm font-semibold text-blue-400 transition duration-300 hover:text-blue-300 hover:underline sm:text-base"
                      >
                        http://localhost:3000/{url.shortCode}
                      </a>

                      <button
                        onClick={() => copyUrl(url)}
                        className="w-fit shrink-0 cursor-pointer rounded-lg bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition duration-300 hover:bg-zinc-700 hover:text-white"
                      >
                        {copiedId === url.id ? "✓ Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-between gap-6 border-t border-zinc-800 pt-5 lg:border-t-0 lg:pt-0">

                  {/* Clicks */}
                  <div className="min-w-[80px] text-center">

                    <div className="text-3xl font-bold">
                      {url.clicks}
                    </div>

                    <p className="mt-1 text-xs uppercase tracking-wider text-zinc-600">
                      Clicks
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteUrl(url.id)}
                    className="cursor-pointer rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2.5 text-sm text-red-400 transition duration-300 hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty State */}
        {urls.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-2xl">
              🔗
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No shortened URLs yet
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Create your first short URL and start tracking clicks.
            </p>

            <Link
              href="/create"
              className="mt-6 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200"
            >
              Create your first URL
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}