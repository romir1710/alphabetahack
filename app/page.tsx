"use client";

import { useState } from "react";
import FounderSearch, { type MatchResult } from "@/components/FounderSearch";
import StudentForm from "@/components/StudentForm";
import { initialStudents } from "@/data/MockStudent";
import type { Student } from "@/types/student";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getPortrait(student: Student, index: number): string {
  if (student.photo) return student.photo;
  const FALLBACK_PORTRAITS = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1280&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1280&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1280&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1280&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1280&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1280&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1280&q=80",
  ];
  return FALLBACK_PORTRAITS[index % FALLBACK_PORTRAITS.length];
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function Page() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [matchedStudents, setMatchedStudents] = useState<Student[]>([]);
  const [view, setView] = useState<"home" | "results">("home");
  const [activeIndex, setActiveIndex] = useState(0);

  function handleNewStudent(student: Student) {
    setStudents((prev) => [student, ...prev]);
  }

  function handleMatchFound(results: MatchResult[]) {
    const enriched: Student[] = results.map((r) => ({
      ...r.student,
      matchReason: r.reason,
    }));
    setMatchedStudents(enriched);
    setView("results");
    setActiveIndex(0);
  }

  /* ── HOME VIEW — light mode, clean & modern ── */
  if (view === "home") {
    return (
      <main className="relative min-h-screen w-full bg-stone-50 text-neutral-900 flex flex-col items-center px-6 py-12 overflow-y-auto">
        {/* Subtle dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Wordmark */}
        <div className="relative z-10 text-center mb-8" style={{ animation: "slideUp 0.7s ease-out both" }}>
          <p className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase mb-3">
            University Talent Network
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tight leading-none text-neutral-900">
            Campus{" "}
            <span className="font-semibold">Connect</span>
          </h1>
        </div>

        {/* Thin rule */}
        <div
          className="relative z-10 w-16 h-px bg-neutral-300 mb-8"
          style={{ animation: "slideUp 0.8s ease-out both" }}
        />

        {/* Components — scrollable column */}
        <div
          className="relative z-10 w-full flex flex-col items-center gap-6 max-w-2xl"
          style={{ animation: "slideUp 0.9s ease-out both" }}
        >
          <FounderSearch
            students={students}
            onMatchFound={handleMatchFound}
          />
          <StudentForm onSubmit={handleNewStudent} />
          {/* Breathing room at the bottom so the form submit button is always reachable */}
          <div className="h-8" />
        </div>
      </main>
    );
  }

  /* ── RESULTS VIEW — Kollektiva editorial layout ── */
  const active = matchedStudents[activeIndex];
  if (!active) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* ── Background image stack ── */}
      {matchedStudents.map((student, i) => (
        <div
          key={student.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${getPortrait(student, i)})` }}
          aria-hidden={i !== activeIndex}
        />
      ))}

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75" />

      {/* ── Content layer ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-12 lg:px-16">

        {/* ── Top zone: name left, match reason right ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Left — active person's name (replaces the editorial phrase) */}
          <h1
            key={`title-${active.id}`}
            className="max-w-xs text-3xl font-normal leading-[1.1] tracking-tight animate-[fadeIn_0.5s_ease] sm:text-5xl lg:text-6xl"
          >
            {active.name}
          </h1>

          {/* Right — match reason / bio */}
          <p
            key={`reason-${active.id}`}
            className="max-w-xs text-sm font-medium leading-relaxed text-white/80 animate-[fadeIn_0.5s_ease] sm:text-base md:pt-2"
          >
            {active.matchReason || active.bio}
          </p>
        </div>

        {/* ── Bottom zone ── */}
        <div className="flex flex-col gap-6">

          {/* Avatar picker row */}
          <div className="flex items-end gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible sm:pb-0">
            {matchedStudents.map((student, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={student.id}
                  onClick={() => setActiveIndex(i)}
                  className="flex shrink-0 flex-col items-center gap-2"
                  aria-label={`Show ${student.name}`}
                >
                  <span
                    className={`h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`block overflow-hidden rounded-full transition-all duration-300 ${
                      isActive
                        ? "h-14 w-14 ring-2 ring-white/60 sm:h-16 sm:w-16"
                        : "h-12 w-12 opacity-60 sm:h-14 sm:w-14"
                    }`}
                  >
                    <img
                      src={getPortrait(student, i)}
                      alt={student.name}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Meta footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-4 text-base font-medium">

            {/* Skills */}
            <span
              key={`skills-${active.id}`}
              className="hidden text-white/75 sm:block text-sm tracking-wide animate-[fadeIn_0.5s_ease]"
            >
              {active.skills.join("  ·  ")}
            </span>

            {/* GitHub + LinkedIn — icon links */}
            <span className="flex items-center gap-4 text-white/80">
              {active.github && (
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${active.name}'s GitHub`}
                  className="flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  {/* GitHub SVG */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span className="text-sm">GitHub</span>
                </a>
              )}
              {active.linkedin && (
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${active.name}'s LinkedIn`}
                  className="flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  {/* LinkedIn SVG */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
            </span>

            {/* Back to search */}
            <button
              onClick={() => setView("home")}
              className="text-sm underline underline-offset-4 transition-colors hover:text-white/70"
            >
              ← Back to Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
