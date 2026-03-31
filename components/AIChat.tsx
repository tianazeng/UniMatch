"use client";

import { useCallback, useMemo, useState } from "react";
import { ClubCard } from "@/components/ClubCard";
import type { Club } from "@/lib/types";
import { Flame, Loader2, Send, Trophy, TrendingUp } from "lucide-react";

const BOT_OPENING =
  "Welcome to UniMatch. Let's find your tribe. Tell me, what's your dream weekend activity?";

const BOT_Q2 =
  "Love it. What kind of people do you vibe with on campus?";

const BOT_Q3 =
  "Last one — what's one skill you'd love to pick up this year?";

const BOT_RESULTS =
  "Here are your Match Results — clubs that line up with what you shared.";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
};

type FlowStep = "await_q1" | "await_q2" | "await_q3" | "loading" | "done";

type AIChatProps = {
  clubs: Club[];
};

export function AIChat({ clubs }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "bot", text: BOT_OPENING },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<FlowStep>("await_q1");
  const [showResults, setShowResults] = useState(false);

  const onSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || step === "loading" || step === "done") return;

    const uid = crypto.randomUUID();
    const userMsg: Message = { id: uid, role: "user", text: trimmed };
    setInput("");

    if (step === "await_q1") {
      setMessages((m) => [
        ...m,
        userMsg,
        { id: crypto.randomUUID(), role: "bot", text: BOT_Q2 },
      ]);
      setStep("await_q2");
      return;
    }
    if (step === "await_q2") {
      setMessages((m) => [
        ...m,
        userMsg,
        { id: crypto.randomUUID(), role: "bot", text: BOT_Q3 },
      ]);
      setStep("await_q3");
      return;
    }
    if (step === "await_q3") {
      setMessages((m) => [...m, userMsg]);
      setStep("loading");
      window.setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: crypto.randomUUID(), role: "bot", text: BOT_RESULTS },
        ]);
        setShowResults(true);
        setStep("done");
      }, 1400);
    }
  }, [input, step]);

  const busy = step === "loading";

  const trendingClubs = useMemo(() => {
    return [...clubs]
      .sort(
        (a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0),
      )
      .slice(0, 5);
  }, [clubs]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="flex-1 space-y-6">
          <div className="overflow-hidden rounded-2xl border border-[#C4D8E2]/30 bg-white/40 backdrop-blur-md shadow-sm">
            <div className="max-h-[min(380px,50vh)] space-y-3 overflow-y-auto p-4 sm:p-5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[80%] ${
                      m.role === "user"
                        ? "bg-columbia-secondary text-white shadow-sm"
                        : "border border-[#64b5f6]/30 bg-[#64b5f6]/25 backdrop-blur-sm text-columbia-accent"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-[#C4D8E2]/30 bg-white/55 backdrop-blur-md px-4 py-3 text-sm text-columbia-accent/80">
                    <Loader2 className="h-4 w-4 animate-spin text-columbia-secondary" />
                    Preparing your matches…
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-[#C4D8E2]/30 bg-white/70 backdrop-blur-md p-3 sm:p-4">
              <div className="flex gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Your message
                </label>
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSend();
                  }}
                  placeholder={step === "done" ? "Session complete" : "Type your answer…"}
                  disabled={busy || step === "done"}
                  className="min-h-11 flex-1 rounded-xl border border-[#C4D8E2]/30 bg-white/40 px-4 text-sm text-columbia-accent placeholder:text-columbia-accent/40 outline-none transition backdrop-blur-sm focus:border-columbia-secondary focus:ring-2 focus:ring-columbia-secondary/25 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={onSend}
                  disabled={busy || step === "done" || !input.trim()}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-columbia-accent px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-columbia-accent/90 disabled:pointer-events-none disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              showResults ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {showResults && (
              <div className="animate-results-in space-y-4">
                <h3 className="text-center text-base font-semibold tracking-tight text-columbia-accent">
                  Match Results
                </h3>
                <ul className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                  {clubs.map((club) => (
                    <li key={club.id}>
                      <ClubCard club={club} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full md:w-80">
          <section className="rounded-2xl border border-[#C4D8E2]/30 bg-white/35 p-5 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight text-columbia-accent">
                  <Flame className="h-4 w-4 text-amber-600" aria-hidden />
                  Hot Picks This Week
                </h3>
                <p className="text-sm text-columbia-accent/70">
                  Columbia&apos;s most popular clubs
                </p>
              </div>
              <div
                className="rounded-xl bg-columbia-blue/20 p-2 ring-1 ring-[#C4D8E2]/30"
                aria-hidden
              >
                <TrendingUp className="h-5 w-5 text-columbia-secondary" />
              </div>
            </div>

            <ol className="mt-4 space-y-2">
              {trendingClubs.map((club, idx) => {
                const rank = idx + 1;
                const score = club.popularity_score ?? 0;

                const topClass =
                  rank === 1
                    ? "ring-1 ring-amber-200 bg-amber-100/70"
                    : rank === 2
                      ? "ring-1 ring-slate-200 bg-slate-100/70"
                      : rank === 3
                        ? "ring-1 ring-orange-200 bg-orange-100/70"
                        : "ring-1 ring-[#C4D8E2]/30 bg-white/25";

                return (
                  <li
                    key={club.id}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[#C4D8E2]/20 px-3 py-2 transition hover:-translate-y-0.5 hover:border-columbia-secondary/35 hover:bg-white/55"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${topClass}`} aria-hidden>
                        {rank <= 3 ? (
                          <Trophy className="h-4 w-4 text-columbia-accent" />
                        ) : (
                          <span className="text-sm font-semibold text-columbia-accent">
                            {rank}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-columbia-accent">
                          {club.logo_emoji} {club.name}
                        </p>
                        <p className="truncate text-xs text-columbia-accent/60">
                          {club.categories.slice(0, 2).join(" · ")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ring-1 ${topClass}`}
                      aria-label={`Popularity score ${score}`}
                    >
                      {score}
                    </span>
                  </li>
                );
              })}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
