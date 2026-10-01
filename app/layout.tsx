import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Connect — University Talent Network",
  description: "Match student-founders with top university talent.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-geist" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
