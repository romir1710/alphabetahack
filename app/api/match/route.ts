import { NextResponse } from "next/server";

export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
}

interface Match {
  id: string;
  reason: string;
}

const SYSTEM_PROMPT = `You are a campus matchmaker. You will receive a search query and a list of students. Rank the top 3 matches. You MUST return ONLY a raw JSON array of objects with keys 'id' (the student's ID) and 'reason' (a 1-sentence explanation of why they match). No markdown, no backticks.`;

// Free models get rate-limited often, so OpenRouter falls back down this list.
const MODELS = [
  "google/gemma-4-31b-it:free",
  "qwen/qwen3.8-27b:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
];

function parseMatches(text: string): Match[] {
  // Small models often wrap JSON in ```json fences despite being told not to.
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1) return [];
  const parsed = JSON.parse(text.slice(start, end + 1));
  return Array.isArray(parsed) ? parsed : [];
}

export async function POST(req: Request) {
  const { query, students } = (await req.json()) as {
    query: string;
    students: Student[];
  };

  if (!query?.trim() || !students?.length) {
    return NextResponse.json({ error: "Query and students are required" }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      models: MODELS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Search query: ${query}\n\nStudents:\n${JSON.stringify(students)}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    console.error("OpenRouter error:", await response.text());
    return NextResponse.json({ error: "AI service failed" }, { status: 502 });
  }

  const data = await response.json();
  const text: string = data.choices?.[0]?.message?.content ?? "";

  let matches: Match[];
  try {
    matches = parseMatches(text);
  } catch {
    console.error("Could not parse AI response:", text);
    return NextResponse.json({ error: "AI returned invalid data" }, { status: 502 });
  }

  return NextResponse.json(matches.slice(0, 3));
}
