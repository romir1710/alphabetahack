import { Student } from "@/components/FounderSearch";

export default function StudentCard({ student }: { student: Student }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{student.name}</p>
          <p className="text-xs text-white/40 tracking-widest uppercase mt-1">
            {student.skills.join("  ·  ")}
          </p>
        </div>
        <div className="flex gap-3 text-[11px] tracking-widest uppercase text-white/40 shrink-0">
          <a href={student.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub ↗
          </a>
          <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn ↗
          </a>
        </div>
      </div>
      <p className="text-sm text-white/60 leading-relaxed">{student.bio}</p>
    </div>
  );
}
