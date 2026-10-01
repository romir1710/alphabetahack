"use client";

import { useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import StudentCard from "@/components/StudentCard";

export interface Student {
  id: string;
  name: string;
  photo: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  avatar?: string;
  cv?: { name: string; dataUrl: string };
}

interface Match {
  id: string;
  reason: string;
}

export default function FounderSearch({ students }: { students: Student[] }) {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findMatches() {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setMatches([]);

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, students }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }
      setMatches(data);
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  const results = matches
    .map((m) => ({ ...m, student: students.find((s) => s.id === m.id) }))
    .filter((m) => m.student);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-4">
        <label className="block text-lg font-medium text-white">
          What kind of co-founder are you looking for?
        </label>
        <div className="flex gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findMatches()}
            placeholder="e.g. A frontend developer who knows React"
            className="flex-1 rounded-xl bg-black/50 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/60"
          />
          <button
            onClick={findMatches}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 font-semibold text-black transition hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            Match
          </button>
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 text-amber-300">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Finding your best matches...</span>
        </div>
      )}

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
    </div>
  );
}
