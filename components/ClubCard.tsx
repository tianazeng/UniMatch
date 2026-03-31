import type { Club } from "@/lib/types";
import { Sparkles } from "lucide-react";

type ClubCardProps = {
  club: Club;
};

export function ClubCard({ club }: ClubCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#C4D8E2]/30 bg-white p-5 shadow-sm transition-all duration-300 hover:border-columbia-secondary/40 hover:shadow-md">
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-columbia-blue/50 text-3xl ring-1 ring-[#C4D8E2]/30 transition-transform duration-300 group-hover:scale-105"
          aria-hidden
        >
          {club.logo_emoji}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-columbia-accent">
              {club.name}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-columbia-blue/60 px-2.5 py-0.5 text-xs font-medium text-columbia-accent">
              <Sparkles className="h-3 w-3" aria-hidden />
              {club.vibe}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-columbia-accent/75">
            {club.description}
          </p>
          <ul className="flex flex-wrap gap-1.5 pt-1">
            {club.tags.map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-lg border border-[#C4D8E2]/25 bg-columbia-surface px-2 py-0.5 text-xs font-medium text-columbia-accent/85">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-xl bg-columbia-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-columbia-accent/90 sm:w-auto"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
