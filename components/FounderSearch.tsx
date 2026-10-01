"use client";

import { useState } from "react";
import { Loader2, Search, Sparkles, FlaskConical } from "lucide-react";
import StudentCard from "@/components/StudentCard";

import type { Student } from "@/types/student";
export type { Student } from "@/types/student";

interface Match {
  id: string;
  reason: string;
}

export interface MatchResult {
  student: Student;
  reason: string;
}

export default function FounderSearch({
  students,
  onMatchFound,
}: {
  students: Student[];
  onMatchFound?: (results: MatchResult[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function enrichAndNotify(rawMatches: Match[]) {
    const enriched = rawMatches
      .map((m) => ({
        reason: m.reason,
        student: students.find((s) => s.id === m.id),
      }))
      .filter((r): r is MatchResult => r.student !== undefined);

    if (onMatchFound && enriched.length > 0) {
      onMatchFound(enriched);
    }
  }

  async function findMatches() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setMatches([]);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          students: students.map(({ id, name, skills, bio }) => ({ id, name, skills, bio })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setMatches(data);
      enrichAndNotify(data);
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  /** Demo mode: skip AI, show first 3 students with canned reasons */
  function loadDemo() {
    const demoReasons = [
      "Exceptional technical depth \u2014 exactly the kind of builder who can ship fast and scale smart.",
      "Rare blend of design intuition and engineering rigour; will elevate every surface of the product.",
      "Domain knowledge + execution track record makes this candidate a force-multiplier for any founding team.",
    ];
    const demoMatches = students.slice(0, 3).map((s, i) => ({
      id: s.id,
      reason: demoReasons[i] ?? "Strong complementary skill set for your venture.",
    }));
    setMatches(demoMatches);
    setError("");
    enrichAndNotify(demoMatches);
  }

  const results = matches
    .map((m) => ({ ...m, student: students.find((s) => s.id === m.id) }))
    .filter((m) => m.student);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Search box */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-6 space-y-4">
        <label className="block text-base font-semibold text-neutral-800 tracking-tight">
          Find a partner
        </label>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findMatches()}
            placeholder="e.g. A frontend developer who knows React"
            className="flex-1 rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 transition-colors text-sm"
          />
          <button
            onClick={findMatches}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white text-sm transition hover:bg-neutral-700 disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Match
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Demo mode button */}
        <button
          onClick={loadDemo}
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <FlaskConical className="h-3 w-3" />
          Preview matches (demo mode)
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center gap-3 text-neutral-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm">Finding your best matches...</span>
        </div>
      )}

      {/* Inline results — shown when no onMatchFound handler (standalone usage) */}
      {!onMatchFound && (
        <div className="space-y-6">
          {results.map(({ id, reason, student }, i) => (
            <div key={id} className="space-y-3">
              <div className="flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-200">
                <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  <span className="font-semibold">#{i + 1} match:</span> {reason}
                </p>
              </div>
              <StudentCard student={student!} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
