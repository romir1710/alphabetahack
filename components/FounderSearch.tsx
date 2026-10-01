"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import type { Student } from "@/types/student";
export type { Student } from "@/types/student";

export interface MatchResult {
  student: Student;
  reason: string;
}

/** Split a free-text query into individual lowercase keywords. */
function parseKeywords(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((k) => k.trim())
    .filter(Boolean);
}

/**
 * Case-insensitive keyword match against a student's skills array.
 * Returns the subset of query keywords that appear in the student's skills.
 */
function matchingSkills(student: Student, keywords: string[]): string[] {
  return keywords.filter((kw) =>
    student.skills.some((skill) => skill.toLowerCase().includes(kw))
  );
}

export default function FounderSearch({
  students,
  onMatchFound,
}: {
  students: Student[];
  onMatchFound?: (results: MatchResult[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchResult[]>([]);
  const [searched, setSearched] = useState(false);

  function findMatches() {
    const q = query.trim();
    if (!q) return;

    const keywords = parseKeywords(q);

    const matched: MatchResult[] = students
      .map((student) => {
        const hits = matchingSkills(student, keywords);
        return { student, hits };
      })
      .filter(({ hits }) => hits.length > 0)
      // Sort: more matching keywords = higher rank
      .sort((a, b) => b.hits.length - a.hits.length)
      .map(({ student, hits }) => ({
        student,
        reason: `Matches: ${hits.join(", ")}`,
      }));

    setResults(matched);
    setSearched(true);

    if (onMatchFound && matched.length > 0) {
      onMatchFound(matched);
    }
  }

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
            placeholder="e.g. Python, React, Figma"
            className="flex-1 rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200 transition-colors text-sm"
          />
          <button
            onClick={findMatches}
            disabled={!query.trim()}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 font-semibold text-white text-sm transition hover:bg-neutral-700 disabled:opacity-40"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* No results message */}
        {searched && results.length === 0 && (
          <p className="text-sm text-neutral-400">
            No profiles match <span className="font-medium text-neutral-700">&ldquo;{query}&rdquo;</span>. Try a different skill.
          </p>
        )}
      </div>

      {/* Inline results — shown when no onMatchFound handler */}
      {!onMatchFound && results.length > 0 && (
        <div className="space-y-3">
          {results.map(({ student, reason }) => (
            <div
              key={student.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm"
            >
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={student.name}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-600">
                  {student.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{student.name}</p>
                <p className="text-xs text-neutral-500 truncate">{reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
