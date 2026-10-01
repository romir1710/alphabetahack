"use client";

import { Code2 as Github, Link as Linkedin, FileText } from "lucide-react";

import type { Student } from "@/types/student";
export type { Student } from "@/types/student";

interface StudentCardProps {
  student: Student;
}

export default function StudentCard({ student }: StudentCardProps) {
  const avatar = student.avatar || student.photo;

  return (
    <div className="group relative w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_30px_-5px_rgba(217,169,56,0.15)]">
      {/* Subtle gradient glow behind the card on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          {avatar ? (
            <img
              src={avatar}
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
              <Github className="h-5 w-5" />
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
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
