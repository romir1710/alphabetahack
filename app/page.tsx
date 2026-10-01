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
  // photo is either a /avatars/... path (mock data) or a base-64 data URL (form upload)
  if (student.photo) return student.photo;
  // Hard fallback — only reached for students added without a photo
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

  /* ── HOME VIEW ── */
  if (view === "home") {
    return (
      <main className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center gap-10 px-6">
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Wordmark */}
        <div style={{ animation: "slideUp 0.8s ease-out both" }}>
          <p className="text-[11px] tracking-[0.35em] text-white/30 uppercase mb-4 text-center">
            University Talent Network
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extralight tracking-tight text-center leading-none">
            Campus{" "}
            <span className="font-semibold italic">Connect</span>
          </h1>
        </div>

        {/* Divider */}
        <div
          className="w-px h-10 bg-white/20"
          style={{ animation: "slideUp 0.9s ease-out both" }}
        />

        {/* Components */}
        <div
          className="w-full flex flex-col items-center gap-6"
          style={{ animation: "slideUp 1s ease-out both" }}
        >
          <FounderSearch
            students={students}
            onMatchFound={handleMatchFound}
          />
          <StudentForm onSubmit={handleNewStudent} />
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      {/* ── Content layer ── */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-6 pt-10 sm:px-10 sm:pb-8 sm:pt-14 lg:px-16">

        {/* ── Top zone — headline + description ── */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-16">
          {/* Left — H1 (static) */}
          <h1 className="max-w-xl text-3xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-7xl">
            Campus Connect is the talent you build with each&nbsp;day
          </h1>

          {/* Right — match reason / bio (animated on slide change) */}
          <p
            key={active.id}
            className="max-w-xs text-sm font-medium leading-relaxed text-white/80 animate-[fadeIn_0.5s_ease] sm:text-base md:pt-2"
          >
            {active.matchReason || active.bio}
          </p>
        </div>

        {/* ── Bottom zone ── */}
        <div className="flex flex-col gap-8">

          {/* Avatar picker row */}
          <div className="flex items-end gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3 sm:overflow-visible sm:pb-0">
            {matchedStudents.map((student, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={student.id}
                  onClick={() => setActiveIndex(i)}
                  className="flex shrink-0 flex-col items-center gap-2"
                  aria-label={`Show ${student.name}`}
                >
                  {/* Active indicator dot */}
                  <span
                    className={`h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {/* Circular thumbnail */}
                  <span className="block h-10 w-10 overflow-hidden rounded-full sm:h-14 sm:w-14">
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
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/20 pt-5 text-sm font-medium">
            {/* Name (animated) */}
            <span key={`name-${active.id}`} className="animate-[fadeIn_0.5s_ease]">
              {active.name}
            </span>

            {/* Skills (hidden mobile, visible sm+) */}
            <span key={`skills-${active.id}`} className="hidden text-white/70 sm:block">
              {active.skills.join(" · ")}
            </span>

            {/* GitHub + LinkedIn (hidden until md) */}
            <span className="hidden text-white/70 md:flex md:gap-3">
              {active.github && (
                <a
                  href={active.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-white/70"
                >
                  GitHub
                </a>
              )}
              {active.linkedin && (
                <a
                  href={active.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-white/70"
                >
                  LinkedIn
                </a>
              )}
            </span>

            {/* Back to search */}
            <button
              onClick={() => setView("home")}
              className="underline underline-offset-4 transition-colors hover:text-white/70"
            >
              ← Back to Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
