export interface Student {
  id: string;
  name: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
}

export const initialStudents: Student[] = [
  {
    id: "student-1",
    name: "Romir Tandon",
    skills: ["Python", "Next.js", "FastAPI", "Apache Kafka", "LangGraph", "PostgreSQL"],
    github: "https://github.com/romirtandon",
    linkedin: "https://linkedin.com/in/romirtandon",
    bio: "Software Engineering undergrad on a First Class trajectory. I build multi-agent AI swarms and real-time event-driven transaction fraud detection pipelines."
  },
  {
    id: "student-2",
    name: "Elena Rostova",
    skills: ["Figma", "UI/UX Design", "WCAG 2.2", "Framer Motion", "Design Systems", "Prototyping", "User Research", "Tailwind CSS"],
    github: "https://github.com/elenarostova",
    linkedin: "https://linkedin.com/in/elena-rostova-design",
    bio: "Product Design junior obsessed with inclusive human-computer interaction and fluid motion physics. Specializes in building WCAG 2.2 AAA compliant enterprise design systems in Figma and translating them into dynamic, accessible React interfaces with Framer Motion."
  },
  {
    id: "student-3",
    name: "Alexander Hayes",
    skills: ["Financial Modeling", "Market Research", "Venture Capital", "Pitch Deck Design", "Go-To-Market Strategy", "Startup Valuation", "Unit Economics"],
    github: "https://github.com/alexhayes-biz",
    linkedin: "https://linkedin.com/in/alexander-hayes-vc",
    bio: "BSc Economics & Management finalist with prior analyst experience at an early-stage fintech VC fund. Currently validating a B2B vertical SaaS proposition for invoice financing; seeking a technical Co-Founder / CTO to architect the MVP and pitch to angel networks."
  },
  {
    id: "student-4",
    name: "Kai Takahashi",
    skills: ["C++", "ROS2", "Embedded Systems", "FreeRTOS", "STM32", "PCB Design", "KiCad", "Microcontrollers", "Computer Vision"],
    github: "https://github.com/kaitakahashi-robotics",
    linkedin: "https://linkedin.com/in/kai-takahashi-robotics",
    bio: "Mechatronics Engineering scholar building autonomous multi-rotor drones and robotic arms. Hands-on expertise in real-time embedded C++, ROS2 orchestration, low-power FreeRTOS drivers on STM32 microcontrollers, custom 4-layer PCB layout in KiCad, and edge perception."
  },
  {
    id: "student-5",
    name: "Sofia Gomez",
    skills: ["Growth Hacking", "Community Management", "Event Production", "Viral Marketing", "Content Strategy", "SEO", "User Acquisition", "Brand Partnerships"],
    github: "https://github.com/sofiagomez-growth",
    linkedin: "https://linkedin.com/in/sofia-gomez-growth",
    bio: "Marketing & Communications major with a track record of scaling campus tech communities from 50 to 3,000+ members. Veteran hackathon organizer and growth strategist skilled in viral organic acquisition funnels, campus ambassador flywheels, and experiential brand activations."
  },
  {
    id: "student-6",
    name: "Jordan Chen",
    skills: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "iOS Development", "Android Development", "REST APIs", "GraphQL", "CoreData"],
    github: "https://github.com/jordanchen-mobile",
    linkedin: "https://linkedin.com/in/jordan-chen-mobile",
    bio: "Native mobile engineer with two self-published iOS/Android apps totaling 20k+ downloads. Specializes in responsive glassmorphic mobile interfaces using SwiftUI and Jetpack Compose; actively looking for a backend engineer to integrate secure auth, websockets, and scalable APIs."
  },
  {
    id: "student-7",
    name: "Manitej Narayan Dasu",
    skills: ["Web Development", "UI/UX Design", "Figma", "React", "Next.js", "Tailwind CSS", "Node.js", "REST APIs", "PostgreSQL", "Vercel", "shadcn/ui"],
    github: "https://github.com/ManitejNarayanadasu",
    linkedin: "https://linkedin.com/in/manitejnarayanadasu",
    bio: "Full-stack developer with a passion for building beautiful and user-friendly web applications. Skilled in React, Next.js, Tailwind CSS, and Node.js. Always looking to learn new technologies and improve my skills."
  }
];
