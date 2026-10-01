"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { SendHorizonal, Camera } from "lucide-react";

export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  avatar?: string;
}

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

export default function StudentForm({ onSubmit }: StudentFormProps) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skillsRaw, setSkillsRaw] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      avatar: avatarPreview,
    };

    onSubmit(student);

    // Reset form
    setName("");
    setBio("");
    setSkillsRaw("");
    setGithub("");
    setLinkedin("");
    setAvatarPreview(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none backdrop-blur-sm transition-colors duration-200 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25";

  const labelClasses = "block text-xs font-medium uppercase tracking-wider text-neutral-400 mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl"
    >
      <h2 className="text-lg font-semibold tracking-tight text-white">
        Join the Network
      </h2>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 transition-colors duration-200 hover:border-amber-500/50"
        >
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera className="h-6 w-6 text-neutral-500 transition-colors duration-200 group-hover:text-amber-400" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatar}
          className="hidden"
        />
        <span className="text-xs text-neutral-600">
          {avatarPreview ? "Click to change" : "Add a photo"}
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

      {/* Submit */}
      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:shadow-[0_0_20px_-3px_rgba(217,169,56,0.5)] active:scale-[0.98]"
      >
        Submit
        <SendHorizonal className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
