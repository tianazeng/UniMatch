"use client";

import { Bell, MessageCircle, Pencil } from "lucide-react";
import { useState } from "react";

const APPLICATIONS = [
  {
    club: "Robotics Club",
    status: "Pending" as const,
    className: "bg-amber-100 text-amber-900 ring-amber-200/80",
  },
  {
    club: "Debate Society",
    status: "Interview Scheduled" as const,
    className: "bg-blue-100 text-blue-900 ring-blue-200/80",
  },
  {
    club: "Film Club",
    status: "Accepted" as const,
    className: "bg-emerald-100 text-emerald-900 ring-emerald-200/80",
  },
];

const NOTIFICATIONS = [
  {
    id: "n1",
    text: "New message from Robotics Club",
    time: "2h ago",
    unread: true,
    icon: "message" as const,
  },
  {
    id: "n2",
    text: "Interview reminder for Friday",
    time: "Yesterday",
    unread: false,
    icon: "bell" as const,
  },
  {
    id: "n3",
    text: "Board Game Lounge event started",
    time: "3 days ago",
    unread: true,
    icon: "message" as const,
  },
];

export function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Roar-lee Lion",
    major: "Comp Sci",
    university: "Columbia University",
  });

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-columbia-accent">
          My profile & progress
        </h2>
        <p className="mt-1 text-sm text-columbia-accent/70">
          Your Columbia identity and application tracker.
        </p>
      </div>

      <section
        className="rounded-2xl border border-[#C4D8E2]/30 bg-white/40 p-6 shadow-sm backdrop-blur-md transition hover:border-columbia-secondary/35 hover:bg-white/55 cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label="Edit personal information"
        onClick={() => {
          if (!editing) setEditing(true);
        }}
        onKeyDown={(e) => {
          if (!editing && (e.key === "Enter" || e.key === " ")) setEditing(true);
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm ring-1 ring-[#C4D8E2]/30"
            aria-hidden
          >
            🦁
          </div>

          {!editing ? (
            <div className="relative min-w-0 flex-1">
              <div className="pr-10">
                <p className="text-lg font-semibold text-columbia-accent">
                  {profile.name}
                </p>
                <p className="text-sm text-columbia-accent/70">
                  Major: {profile.major}
                </p>
                <p className="mt-2 text-xs text-columbia-accent/50">
                  {profile.university}
                </p>
              </div>

              <div className="absolute right-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/40 backdrop-blur-sm ring-1 ring-[#C4D8E2]/30">
                <Pencil
                  className="h-4 w-4 text-columbia-accent/80"
                  aria-hidden
                />
              </div>
            </div>
          ) : (
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-columbia-accent/60">
                  Name
                </span>
                <input
                  value={profile.name}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#C4D8E2]/30 bg-white/60 px-3 py-2 text-sm text-columbia-accent outline-none transition focus:border-columbia-secondary focus:ring-2 focus:ring-columbia-secondary/25"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-columbia-accent/60">
                  Major
                </span>
                <input
                  value={profile.major}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, major: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#C4D8E2]/30 bg-white/60 px-3 py-2 text-sm text-columbia-accent outline-none transition focus:border-columbia-secondary focus:ring-2 focus:ring-columbia-secondary/25"
                />
              </label>

              <label className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-columbia-accent/60">
                  University
                </span>
                <input
                  value={profile.university}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, university: e.target.value }))
                  }
                  className="w-full rounded-xl border border-[#C4D8E2]/30 bg-white/60 px-3 py-2 text-sm text-columbia-accent outline-none transition focus:border-columbia-secondary focus:ring-2 focus:ring-columbia-secondary/25"
                />
              </label>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(false);
                  }}
                  className="rounded-xl border border-[#C4D8E2]/30 bg-white/60 px-4 py-2 text-sm font-semibold text-columbia-accent transition hover:bg-white/75"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(false);
                  }}
                  className="rounded-xl bg-columbia-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-columbia-accent/90"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-[#C4D8E2]/30 bg-white/40 p-6 shadow-sm backdrop-blur-md">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-columbia-accent/60">
            Application status
          </h3>
          <ul className="mt-4 space-y-3">
            {APPLICATIONS.map((row) => (
              <li
                key={row.club}
                className="flex flex-col gap-2 rounded-xl border border-[#C4D8E2]/20 bg-white/30 px-4 py-3 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="font-medium text-columbia-accent">
                  {row.club}
                </span>
                <span
                  className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${row.className}`}
                >
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#C4D8E2]/30 bg-white/35 p-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-columbia-accent/60">
              <Bell className="h-4 w-4 text-columbia-accent" aria-hidden />
              Notifications
            </h3>
          </div>

          <ul className="mt-4 space-y-3">
            {NOTIFICATIONS.map((n) => (
              <li
                key={n.id}
                className="group flex items-start justify-between gap-3 rounded-xl border border-[#C4D8E2]/20 bg-white/25 p-3 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-columbia-secondary/35 hover:bg-white/45"
              >
                <div className="flex min-w-0 gap-2">
                  <div
                    className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-columbia-blue/20 ring-1 ring-[#C4D8E2]/30"
                    aria-hidden
                  >
                    {n.icon === "message" ? (
                      <MessageCircle className="h-4 w-4 text-columbia-accent" />
                    ) : (
                      <Bell className="h-4 w-4 text-columbia-accent" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-columbia-accent">
                      {n.text}
                    </p>
                    <p className="mt-1 text-xs text-columbia-accent/60">
                      {n.time}
                    </p>
                  </div>
                </div>

                {n.unread ? (
                  <span
                    className="inline-flex w-fit items-center rounded-full bg-columbia-accent px-2 py-1 text-[11px] font-semibold text-white"
                    aria-label="Unread notification"
                  >
                    New
                  </span>
                ) : (
                  <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-columbia-accent/20" aria-hidden />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
