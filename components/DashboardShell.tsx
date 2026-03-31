"use client";

import { useState } from "react";
import { AIChat } from "@/components/AIChat";
import { DiscoveryHub } from "@/components/DiscoveryHub";
import { StudentProfile } from "@/components/StudentProfile";
import type { Club } from "@/lib/types";
import { Compass, MessageCircle, User } from "lucide-react";

export type DashboardSection = "discover" | "oracle" | "profile";

const NAV: { id: DashboardSection; label: string; icon: typeof Compass }[] = [
  { id: "discover", label: "Discover", icon: Compass },
  { id: "oracle", label: "The Oracle", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

type DashboardShellProps = {
  clubs: Club[];
};

export function DashboardShell({ clubs }: DashboardShellProps) {
  const [section, setSection] = useState<DashboardSection>("discover");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b border-[#C4D8E2]/30 bg-columbia-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-[#C4D8E2]/30"
            aria-hidden
          >
            🦁
          </span>
          <div>
            <p className="text-sm font-semibold text-columbia-accent">
              UniMatch
            </p>
            <p className="text-xs text-columbia-accent/60">
              Columbia University
            </p>
          </div>
        </div>

        <nav
          className="mx-auto hidden max-w-5xl border-t border-[#C4D8E2]/20 px-4 sm:px-6 md:flex md:gap-1 md:py-2"
          aria-label="Primary"
        >
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                section === id
                  ? "bg-columbia-blue/50 text-columbia-accent"
                  : "text-columbia-accent/70 hover:bg-white/80 hover:text-columbia-accent"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-4 py-6 pb-24 md:px-6 md:pb-8">
        <div className="mx-auto max-w-5xl">
          {section === "discover" && <DiscoveryHub clubs={clubs} />}
          {section === "oracle" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-columbia-accent">
                  The Oracle
                </h2>
                <p className="mt-1 text-sm text-columbia-accent/70">
                  Answer three quick questions — we&apos;ll surface your match
                  results.
                </p>
              </div>
              <AIChat clubs={clubs} />
            </div>
          )}
          {section === "profile" && <StudentProfile />}
        </div>
      </main>

      <nav
        className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#C4D8E2]/30 bg-columbia-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-lg justify-around px-2 py-2">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`flex min-w-[4.5rem] flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-xs font-medium transition ${
                section === id
                  ? "text-columbia-secondary"
                  : "text-columbia-accent/60"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
