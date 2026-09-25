"use client";

import { signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      {session.user.image && (
        <img
          src={session.user.image}
          alt="Profile"
          className="h-9 w-9 rounded-full"
        />
      )}

      <div className="text-right">
        <p className="text-sm font-medium text-white">
          {session.user.name}
        </p>

        <p className="text-xs text-zinc-400">
          {session.user.email}
        </p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20"
      >
        Logout
      </button>
    </div>
  );
}