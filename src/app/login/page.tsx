import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-6 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl backdrop-blur-xl transition duration-500 hover:border-zinc-700">

          {/* Logo */}
          <div className="text-center">

            <div className="group mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 text-3xl shadow-lg transition duration-500 hover:scale-110 hover:rotate-3">
              <span className="transition duration-500 group-hover:rotate-12">
                🔗
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              QuickLink
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Shorten your links. Share them faster.
            </p>

            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Sign in to create, manage and track your short URLs.
            </p>

          </div>

          {/* Login */}
          <div className="mt-8">
            <GoogleLoginButton />
          </div>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />

            <span className="text-xs text-zinc-600">
              SECURE LOGIN
            </span>

            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* Features */}
          <div className="space-y-3">

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition duration-300 hover:border-zinc-700">
              <span className="text-sm">🔗</span>

              <span className="text-sm text-zinc-400">
                Create unlimited short URLs
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition duration-300 hover:border-zinc-700">
              <span className="text-sm">📊</span>

              <span className="text-sm text-zinc-400">
                Track your link clicks
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 transition duration-300 hover:border-zinc-700">
              <span className="text-sm">🔒</span>

              <span className="text-sm text-zinc-400">
                Your links stay private
              </span>
            </div>

          </div>

        </div>

        <p className="mt-5 text-center text-xs text-zinc-600">
          Fast • Simple • Secure URL shortening
        </p>

      </div>
    </main>
  );
}