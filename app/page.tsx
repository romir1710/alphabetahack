"use client";

import { useState } from "react";
import FounderSearch from "@/components/FounderSearch";
import { initialStudents } from "@/MockStudent";

export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  image?: string;
  matchReason?: string;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80";

/* ─────────────────────────────────────────────
   StudentForm placeholder
   (teammate will replace with real component)
───────────────────────────────────────────── */
function StudentForm() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="border border-white/10 rounded-sm p-6 text-center text-white/30 text-sm tracking-widest uppercase">
        Student Profile Form — coming soon
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function Page() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col items-center justify-center gap-10 px-6 py-20">
      {/* Subtle background grid */}
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

      {/* Child component slots */}
      <div
        className="w-full flex flex-col items-center gap-6"
        style={{ animation: "slideUp 1s ease-out both" }}
      >
        <FounderSearch students={initialStudents} />
        <StudentForm />
      </div>
    </main>
  );
}
