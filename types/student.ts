export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  /** Profile photo — either a public URL path (mock data) or a base-64 data URL (form upload). */
  photo?: string;
  cv?: { name: string; dataUrl: string };
  matchReason?: string;
}
