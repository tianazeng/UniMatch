"use client";

import { useMemo, useState } from "react";
import { ClubCard } from "@/components/ClubCard";
import type { Club } from "@/lib/types";
import { Search } from "lucide-react";

const FILTER_CHIPS = ["Sports", "Tech", "Arts", "Social", "Outdoors"] as const;

type DiscoveryHubProps = {
  clubs: Club[];
};

export function DiscoveryHub({ clubs }: DiscoveryHubProps) {
  const [query, setQuery] = useState("");
  const [activeChips, setActiveChips] = useState<Set<string>>(new Set());

  const toggleChip = (chip: string) => {
    setActiveChips((prev) => {
      const next = new Set(prev);
      if (next.has(chip)) next.delete(chip);
      else next.add(chip);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesSearch =
        !q ||
        club.name.toLowerCase().includes(q) ||
        club.tags.some((t) => t.toLowerCase().includes(q)) ||
        club.description.toLowerCase().includes(q);

      const matchesChips =
        activeChips.size === 0 ||
        club.categories.some((c) => activeChips.has(c));

      return matchesSearch && matchesChips;
    });
  }, [clubs, query, activeChips]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-columbia-accent">
          Discovery Hub
        </h2>
        <p className="mt-1 text-sm text-columbia-accent/70">
          Search by name or tags, or tap a category to narrow the list.
        </p>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-columbia-accent/40"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clubs by name or tags…"
          className="w-full rounded-xl border border-[#C4D8E2]/30 bg-white py-3 pl-10 pr-4 text-sm text-columbia-accent shadow-sm outline-none ring-columbia-secondary/30 transition focus:ring-2"
          aria-label="Search clubs"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTER_CHIPS.map((chip) => {
          const on = activeChips.has(chip);
          return (
            <button
              key={chip}
              type="button"
              onClick={() => toggleChip(chip)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                on
                  ? "border-columbia-secondary bg-columbia-secondary/15 text-columbia-accent"
                  : "border-[#C4D8E2]/30 bg-white text-columbia-accent/80 hover:border-columbia-secondary/50"
              }`}
            >
              {chip}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {filtered.map((club) => (
          <li key={club.id}>
            <ClubCard club={club} />
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#C4D8E2]/40 bg-white/60 py-8 text-center text-sm text-columbia-accent/60">
          No clubs match your filters. Try clearing a chip or adjusting search.
        </p>
      )}
    </div>
  );
}
