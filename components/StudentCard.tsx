"use client";

import { FileText } from "lucide-react";

// Brand icons removed from lucide-react v1.49 — using inline SVGs
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

import type { Student } from "@/types/student";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="group relative w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_30px_-5px_rgba(217,169,56,0.15)]">
      {/* Subtle gradient glow behind the card on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          {student.photo ? (
            <img
              src={student.photo}
              alt={student.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-amber-500/40"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/80 to-yellow-600/80 text-lg font-bold text-black">
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight text-white">
              {student.name}
            </h3>
          </div>
        </div>

        {/* Bio */}
        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400">
          {student.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-300"
            >
              {skill}
            </span>
          ))}
        </div>

        {student.cv && (
          <a
            href={student.cv.dataUrl}
            download={student.cv.name}
            aria-label={`Download ${student.name}'s CV`}
            className="flex items-center gap-2 self-start rounded-lg border border-amber-500/20 px-3 py-2 text-sm text-amber-300 transition-all duration-200 hover:border-amber-400/60 hover:bg-amber-500/20 hover:text-amber-100 active:scale-95 active:bg-amber-500/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none motion-reduce:transform-none"
          >
            <FileText className="h-4 w-4" />
            Download CV
          </a>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-3 pt-1">
          {student.github && (
            <a
              href={student.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name}'s GitHub`}
              className="rounded-lg p-2 text-neutral-400 transition-all duration-200 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-110 active:scale-95 active:bg-amber-500/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none motion-reduce:transform-none"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          )}

          {student.linkedin && (
            <a
              href={student.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${student.name}'s LinkedIn`}
              className="rounded-lg p-2 text-neutral-400 transition-all duration-200 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-110 active:scale-95 active:bg-amber-500/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 motion-reduce:transition-none motion-reduce:transform-none"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
