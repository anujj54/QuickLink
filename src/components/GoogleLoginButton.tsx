"use client";

import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-white px-4 text-sm font-semibold text-zinc-900 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-100 hover:shadow-white/10 cursor-pointer"
    >
      {/* Google Logo */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.42z"
        />
        <path
          fill="#34A853"
          d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75z"
        />
        <path
          fill="#FBBC05"
          d="M6.53 13.83A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.83V7.64H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.36l3.24-2.53z"
        />
        <path
          fill="#EA4335"
          d="M12 6.14c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.17 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.39l3.24 2.53C7.3 7.86 9.46 6.14 12 6.14z"
        />
      </svg>

      <span className="whitespace-nowrap">Continue with Google</span>
    </button>
  );
}