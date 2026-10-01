"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { SendHorizonal, Camera } from "lucide-react";

import type { Student } from "@/types/student";
export type { Student } from "@/types/student";

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skillsRaw, setSkillsRaw] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | undefined>();
  const [cv, setCv] = useState<Student["cv"]>();
  const [cvError, setCvError] = useState("");
  const [cvLoading, setCvLoading] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const cvReaderRef = useRef<FileReader | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCv = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (cvReaderRef.current) {
      cvReaderRef.current.onload = null;
      cvReaderRef.current.onerror = null;
      cvReaderRef.current.abort();
    }
    setCv(undefined);
    setCvError("");
    setCvLoading(false);
    if (!/\.(pdf|doc|docx)$/i.test(file.name) || file.size === 0 || file.size > 5 * 1024 * 1024) {
      setCvError("Choose a non-empty PDF or Word document up to 5 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    cvReaderRef.current = reader;
    setCvLoading(true);
    reader.onload = () => {
      setCv({ name: file.name, dataUrl: reader.result as string });
      setCvLoading(false);
    };
    reader.onerror = () => {
      setCvError("Unable to read this CV. Please select it again.");
      setCvLoading(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cvLoading || cvError) return;

    const skills = skillsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const student: Student = {
      id: crypto.randomUUID(),
      name: name.trim(),
      skills,
      github: github.trim(),
      linkedin: linkedin.trim(),
      bio: bio.trim(),
      photo: photoPreview,
      cv,
    };

    onSubmit(student);

    // Reset form
    setName("");
    setBio("");
    setSkillsRaw("");
    setGithub("");
    setLinkedin("");
    setPhotoPreview(undefined);
    setCv(undefined);
    setCvError("");
    if (cvInputRef.current) cvInputRef.current.value = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputClasses =
    "w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors duration-200 hover:border-neutral-300 focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200 motion-reduce:transition-none";

  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-5 rounded-2xl border border-neutral-200 bg-white shadow-sm p-6"
    >
      <h2 className="text-base font-semibold tracking-tight text-neutral-900">
        Join the Network
      </h2>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          aria-label={photoPreview ? "Change profile photo" : "Add profile photo"}
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-neutral-300 transition-all duration-200 hover:border-neutral-500 hover:bg-neutral-100 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:transform-none"
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera className="h-6 w-6 text-neutral-400 transition-colors duration-200 group-hover:text-neutral-700" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          className="hidden"
        />
        <span className="text-xs text-neutral-400">
          {photoPreview ? "Click to change" : "Add a photo"}
        </span>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClasses}>
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* Bio */}
      <div>
        <label htmlFor="bio" className={labelClasses}>
          Bio
        </label>
        <textarea
          id="bio"
          required
          rows={3}
          placeholder="CS student passionate about distributed systems…"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="skills" className={labelClasses}>
          Skills{" "}
          <span className="normal-case tracking-normal text-neutral-600">
            (comma-separated)
          </span>
        </label>
        <input
          id="skills"
          type="text"
          required
          placeholder="React, Python, Figma"
          value={skillsRaw}
          onChange={(e) => setSkillsRaw(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* GitHub */}
      <div>
        <label htmlFor="github" className={labelClasses}>
          GitHub URL
        </label>
        <input
          id="github"
          type="url"
          placeholder="https://github.com/janedoe"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label htmlFor="linkedin" className={labelClasses}>
          LinkedIn URL
        </label>
        <input
          id="linkedin"
          type="url"
          placeholder="https://linkedin.com/in/janedoe"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* CV Upload */}
      <div>
        <label htmlFor="cv" className={labelClasses}>
          CV <span className="normal-case tracking-normal text-neutral-600">(optional)</span>
        </label>
        <input
          ref={cvInputRef}
          id="cv"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleCv}
          aria-describedby="cv-help cv-status"
          aria-invalid={Boolean(cvError)}
          className={`${inputClasses} file:mr-3 file:rounded-md file:border-0 file:bg-neutral-100 file:px-3 file:py-1 file:text-neutral-600 file:text-xs cursor-pointer file:cursor-pointer file:transition-colors hover:file:bg-neutral-200 active:file:bg-neutral-300 file:motion-reduce:transition-none`}
        />
        <p id="cv-help" className="mt-1.5 text-xs text-neutral-500">PDF or Word document, up to 5 MB.</p>
        <p id="cv-status" aria-live="polite" className={`mt-1 text-xs ${cvError ? "text-red-500" : "text-neutral-400"}`}>
          {cvError || (cvLoading ? "Reading CV…" : cv ? `${cv.name} ready to upload` : "")}
        </p>
        {(cv || cvError) && (
          <button type="button" className="mt-2 rounded-lg px-3 py-2 text-xs text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-800 active:scale-95 active:bg-neutral-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:transform-none" onClick={() => {
            setCv(undefined);
            setCvError("");
            if (cvInputRef.current) cvInputRef.current.value = "";
          }}>
            Remove CV
          </button>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={cvLoading || Boolean(cvError)}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 enabled:hover:bg-neutral-700 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:transform-none"
      >
        {cvLoading ? "Reading CV…" : "Submit"}
        <SendHorizonal className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5 motion-reduce:transform-none" />
      </button>
    </form>
  );
}
