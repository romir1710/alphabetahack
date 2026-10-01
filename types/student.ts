export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  photo?: string;
  avatar?: string;
  cv?: { name: string; dataUrl: string };
}
