import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Connect — University Talent Network",
  description: "Match student-founders with top university talent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
