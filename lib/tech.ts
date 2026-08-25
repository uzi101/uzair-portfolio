import * as si from "simple-icons";

export type Tech = {
  name: string;
  /** SVG path data when a brand icon exists. */
  path?: string;
  /** Brand color, revealed on hover. Tiles render monochrome at rest. */
  hex?: string;
  /** Lettermark fallback for brands Simple Icons doesn't carry (trademark removals). */
  mark?: string;
};

type IconRecord = { path: string; hex: string };

/** Resolve a Simple Icons slug at build time; server-rendered, so zero client JS. */
function icon(slug: string, name: string): Tech {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const found = (si as unknown as Record<string, IconRecord>)[key];
  if (!found) throw new Error(`simple-icons is missing "${slug}" — add a lettermark instead.`);
  return { name, path: found.path, hex: `#${found.hex}` };
}

const mark = (name: string, glyph: string): Tech => ({ name, mark: glyph });

export const techGroups: { group: string; items: Tech[] }[] = [
  {
    group: "Languages",
    items: [
      icon("python", "Python"),
      icon("cplusplus", "C++"),
      mark("Java", "Java"),
      icon("typescript", "TypeScript"),
      icon("javascript", "JavaScript"),
      mark("C#", "C#"),
      mark("SQL", "SQL"),
      icon("gnubash", "Bash"),
    ],
  },
  {
    group: "Frameworks",
    items: [
      icon("springboot", "Spring Boot"),
      icon("fastapi", "FastAPI"),
      icon("react", "React"),
      icon("nextdotjs", "Next.js"),
      icon("angular", "Angular"),
      icon("dotnet", ".NET"),
      icon("hono", "Hono"),
      icon("tailwindcss", "Tailwind"),
    ],
  },
  {
    group: "Data & Infrastructure",
    items: [
      mark("AWS", "AWS"),
      icon("cloudflare", "Cloudflare"),
      icon("docker", "Docker"),
      icon("kubernetes", "Kubernetes"),
      icon("terraform", "Terraform"),
      icon("postgresql", "PostgreSQL"),
      icon("supabase", "Supabase"),
      icon("firebase", "Firebase"),
      icon("redis", "Redis"),
      icon("githubactions", "CI/CD"),
      mark("gRPC", "gRPC"),
      icon("linux", "Linux"),
    ],
  },
  {
    group: "Systems & HPC",
    items: [
      icon("nvidia", "CUDA"),
      mark("MPI", "MPI"),
      mark("TensorRT", "TensorRT"),
      icon("cmake", "CMake"),
      icon("onnx", "ONNX"),
      icon("git", "Git"),
    ],
  },
  {
    group: "Applied AI",
    items: [
      icon("anthropic", "Claude"),
      mark("OpenAI", "OpenAI"),
      mark("MCP", "MCP"),
      icon("pytorch", "PyTorch"),
      mark("FAISS", "FAISS"),
      icon("opencv", "OpenCV"),
    ],
  },
];
