/**
 * Every fact on this site lives here.
 *
 * Sourcing rules from the experience writeup:
 *  - Real numbers only where a real number exists.
 *  - Self-reported figures say "reported". Projections say "projected".
 *  - Never count output (endpoints, tools, lines) as impact.
 *
 * Deliberately absent, per that doc's confidentiality section:
 *  - Any JPMorgan internal developer-environment or auth architecture.
 *  - The Loan Navigator pilot headcount and cycle-time projection.
 *  - Any phrasing that calls Devvy "in production" at the bank.
 */

export const profile = {
  name: "Uzair Beg",
  handle: "uzi101",
  role: "Systems & Applied AI Engineer",
  location: "SF",
  status: "Seeking work that excites me",
  tagline:
    "I build the stuff that has to be fast and can't fall over. Payments at JPMorgan, edge inference at an NSF lab, agent infrastructure at MultAI, and lately the Linux kernel.",
  email: "uzairbeg11@gmail.com",
  phone: "440-412-6300",
  links: {
    github: "https://github.com/uzi101",
    linkedin: "https://linkedin.com/in/uzair-beg",
    calendly: "https://calendly.com/uzairbeg11/30min",
  },
} as const;

export const stats = [
  { value: "50+", label: "engineers on Devvy daily", note: "internal, JPMC" },
  { value: "~93%", label: "less migration effort", note: "Chase payment teams" },
  { value: "20+", label: "clinics running Paws AI", note: "founding engineer" },
] as const;

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  /** Monogram + tint stand in for a company logo — no external image requests. */
  logo: { mark: string; tint: string };
  /** The judgment, not the task. */
  call?: { headline: string; body: string };
  /** `**bold**` marks the terms worth skimming for. */
  bullets: string[];
  stack: string[];
  href?: string;
};

export const experience: Experience[] = [
  {
    company: "JPMorgan Chase & Co.",
    role: "Software Engineering Intern",
    period: "Jun – Aug 2026",
    location: "Columbus, OH",
    logo: { mark: "JPM", tint: "#7BA7D7" },
    summary: "Shipped the assigned build. Also won the internal hackathon and kept going.",
    call: {
      headline: "Shipped through a mid-build platform migration",
      body: "Deployment was already stood up internally when the target moved to AWS. Two of ten weeks went to access and scope churn. It still shipped.",
    },
    bullets: [
      "Built **Loan Navigator** end to end — a **React** and **Spring Boot** platform with SSO and automated CI/CD on **AWS** that tells branch relationship managers which loan product a small business qualifies for, shipped to a Midwest pilot.",
      "Drove development across a 2–3 engineer project and ran live feedback sessions with product managers, managing directors, and the relationship managers using it.",
      "Built **Devvy**, an autonomous multi-agent coding assistant that won the firm's internal hackathon, then reached **50+ engineers** in daily internal use and cut development time per task by a reported **~20%**.",
      "Owned Devvy's **Model Context Protocol** integration layer across Jira, Bitbucket, and Outlook, a **three-tier cross-session memory** system with keyword-scoped retrieval, and a checkpointed goal/acceptance-criteria state machine sustaining single runs past **10+ hours** across model rate limits.",
    ],
    stack: ["React", "Spring Boot", "AWS", "TypeScript", "Node.js", "MCP"],
  },
  {
    company: "ICICLE — NSF AI Institute",
    role: "Undergraduate Researcher",
    period: "Jan – May 2026",
    location: "Ohio State",
    logo: { mark: "OSU", tint: "#D64545" },
    summary: "HARVEST, the lab's digital agriculture vision framework — real-time weed detection for ground vehicles.",
    call: {
      headline: "The budget was derived, not met",
      body: "15–20 mph is the tractor speed I engineered against. The field deployment was still ahead of us when I left. My work was hitting the budget on-device.",
    },
    bullets: [
      "Optimized the **HARVEST** weed-detection inference pipeline with **TensorRT** and reduced-precision quantization, targeting real-time throughput on an **NVIDIA Jetson Orin Nano Super** inside a 25 W power envelope.",
      "Benchmarked GPU and multi-threaded **C/C++** workloads across the compute continuum from **A100** and **V100** cluster hardware down to the edge device, profiling throughput, tail latency, and synchronization overhead.",
    ],
    stack: ["C++", "CUDA", "TensorRT", "PyTorch", "ONNX", "Jetson"],
  },
  {
    company: "JPMorgan Chase & Co.",
    role: "Software Engineering Intern",
    period: "Jun – Aug 2025",
    location: "Columbus, OH",
    logo: { mark: "JPM", tint: "#7BA7D7" },
    summary: "Core Payments Infrastructure. Every Chase payment routes through it — Zelle, wires, all of it.",
    call: {
      headline: "Deleted the service I proposed",
      body: "I pitched a connector microservice and prototyped it on EC2. Benchmarked it: HTTP serialization was pure overhead. gRPC was faster, still not free. The layer only did stateless validation — so a network hop bought nothing and added a failure domain to a path that had to hold 99.99%. I made it a library instead.",
    },
    bullets: [
      "Architected a distributed middleware abstraction decoupling legacy **Core Payment Systems** from the new **Payment Instruction Manager**, shipped as a shared **Java** library that teams link directly into their codebase — handling validation, request transformation, and PIM compatibility in-process across dozens of dependent services, cutting cross-team migration effort **~93%**.",
      "Prototyped and benchmarked the alternatives first: a **Spring Boot** connector microservice on **AWS EC2**, then **gRPC** over **HTTP/2** with **Protobuf** serialization, measured against a mock Create Transaction path and rejected on serialization and network overhead.",
      "Held **sub-100ms** latency and **99.99%** availability targets across **Zelle** and wire transfer flows, with invalid requests failing fast before ever reaching the core system.",
      "Became the standard integration path for payment teams onboarding to PIM, and removed per-team infrastructure cost entirely.",
    ],
    stack: ["Java", "Spring Boot", "gRPC", "Protobuf", "AWS"],
  },
  {
    company: "Paws AI",
    role: "Founding Engineer",
    period: "Aug 2024 – May 2025",
    location: "Remote",
    logo: { mark: "PAW", tint: "#4ECDC4" },
    summary: "Vet documentation platform. Four-person startup, zero to production. I owned the backend.",
    call: {
      headline: "Both hard limits were API limits",
      body: "Whisper caps uploads at 25 MB and real appointments blow past it. GPT-4o's context couldn't hold a long oncology case. Chunking fixed the first, map-reduce the second.",
    },
    bullets: [
      "Architected a multi-tenant **FastAPI** and **PostgreSQL** platform with **RBAC** and per-clinic data isolation for clinical records, migrating the system off **Firestore** and taking the backend zero to production as founding engineer at a four-person startup.",
      "Built a two-tier caching layer combining an in-process **LRU** cache with **Redis** in front of vector-embedding and patient-record lookups, cutting database reads by **~65%**.",
      "Shipped an asynchronous **WebSocket** layer on **FastAPI** with connection pooling and **Firebase** authentication, sustaining **200+** concurrent sessions under **200ms**.",
      "Engineered the documentation pipeline around two hard API ceilings — **Whisper** transcription chunked past the 25 MB upload cap, **GPT-4o** SOAP notes with map-reduce fallback beyond the context window, and **FAISS**-backed retrieval chat.",
      "Onboarded **20+ veterinary clinics**; vets reported saving **~2 hours a day** on charting and several took on **~10% more patients** per month.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "WebSockets", "Whisper", "GPT-4o", "FAISS"],
  },
  {
    company: "Snap Inc.",
    role: "Software Engineering Extern",
    period: "Sep – Dec 2024",
    location: "Remote",
    logo: { mark: "SNP", tint: "#E5D53A" },
    summary: "Remote externship. Pick a concept, build a Lens, defend it to Snap engineers.",
    bullets: [
      "Built an interactive **AR Lens** in **Lens Studio** with real-time input handling, animation logic, and engagement mechanics.",
      "Presented product reasoning and a live demo to Snap engineers, defending a concept chosen from observed user interest rather than personal taste.",
    ],
    stack: ["Lens Studio", "JavaScript", "AR"],
  },
  {
    company: "DRB Systems (Vontier)",
    role: "Software Engineering Intern",
    period: "May – Aug 2024",
    location: "Akron, OH",
    logo: { mark: "DRB", tint: "#E8833A" },
    summary: "Acquired by Vontier in 2021 — same company, two names. Small team with no DevOps practice at all before I got there.",
    call: {
      headline: "The variance was the problem",
      body: "Manual QA ran two hours to a full day depending on config drift. Long is annoying. Unpredictable is unplannable. Containers made it a known quantity.",
    },
    bullets: [
      "Built the team's **first CI/CD** pipelines from scratch in **Azure DevOps** YAML covering every **C#/.NET** Web API and **Angular** application, automating builds, tests, and **AWS ECR/EC2** deployments.",
      "Containerized legacy production services with **Docker** and standardized environment configuration to eliminate cross-environment drift.",
      "Replaced a fully manual release process, cutting release time by **~70%** and removing **2+ hours** of manual QA per deployment.",
    ],
    stack: ["C#/.NET", "Angular", "Azure DevOps", "Docker", "AWS ECR"],
  },
];

export type Project = {
  name: string;
  category: "Startups" | "Systems & Open Source";
  kind: string;
  period: string;
  blurb: string;
  detail: string[];
  stack: string[];
  href?: string;
  status?: { label: string; tone: "live" | "amber" | "muted" };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "MultAI",
    category: "Systems & Open Source",
    kind: "Project",
    period: "2026",
    blurb:
      "Built to work out what agent-to-agent coordination looks like when privacy is the binding constraint rather than an afterthought. Everyone in a company gets one agent holding their context, and agents answer each other's questions directly — so you get the answer without interrupting the person. A few startups are testing it.",
    detail: [
      "No orchestrator. That's privacy, not scaling — an orchestrator good enough to route well would need read access to everyone's context, which is the exact boundary the product exists to protect.",
      "A responding agent runs tool-less: one turn, persona plus question, no tools. So agent-to-agent is depth-1 by construction, and an inbound request can't make your agent read your private data. Blast radius bounded by architecture, not by prompt.",
      "Approvals store the action, not a re-derivation. The gated call is persisted verbatim and replayed on approval. The model is never re-prompted, so what runs is what was approved.",
      "The permission boundary is an attention boundary. The only gated tools are the two that cost a human's attention. Reads are free.",
    ],
    stack: ["Hono", "Cloudflare Workers", "Supabase", "Postgres RLS", "React 19", "Anthropic API"],
    status: { label: "Testing with startups", tone: "live" },
    featured: true,
  },
  {
    name: "QuantLib",
    category: "Systems & Open Source",
    kind: "Open Source Contributor",
    period: "Nov 2025",
    blurb:
      "Shipped a const-notional cross-currency swap bootstrap helper in C++ through four rounds of maintainer review. Fixed foreign-leg collateral discounting and replaced weak assertions with par round-trip tests.",
    detail: [],
    stack: ["C++", "SWIG", "Quant Finance"],
    href: "https://github.com/lballabio/QuantLib",
    status: { label: "Merged in v1.41", tone: "live" },
  },
  {
    name: "Linux io_uring",
    category: "Systems & Open Source",
    kind: "Kernel Contributor",
    period: "Aug 2026 – Present",
    blurb:
      "Chasing a fixed-file installation regression in io_uring's MSG_RING SEND_FD path, alongside the reporter who has the bare-metal rig. Reading the install path turned up why: the allocation cache is only ever populated on free, and a first fill into a sparse table frees nothing — so every install in a first fill is a guaranteed miss by construction. Preparing a two-patch series: a dedicated kmem_cache for resource nodes, then bulk refill on miss.",
    detail: [],
    stack: ["C", "Linux Kernel", "perf", "ftrace"],
    href: "https://lore.kernel.org/io-uring/CANGjgdmt0FQ=offsdfn+wEaDxbOFoAa6bi92X_vEo4S6aCZ56A@mail.gmail.com/",
    status: { label: "Patch in progress", tone: "amber" },
  },
  {
    name: "AlphaSevn",
    category: "Startups",
    kind: "Co-Founder",
    period: "2025",
    blurb:
      "Algorithmic prop-trading system — research, execution, and risk in one pipeline. Backtested beautifully. That turned out to be the problem lol",
    detail: [],
    stack: ["Python", "C++", "Market Data"],
    status: { label: "Shut down", tone: "muted" },
  },
  {
    name: "Fee Dodger",
    category: "Startups",
    kind: "Co-Founder",
    period: "2023",
    blurb:
      "Inventory platform for resellers — cost basis, marketplace fees, and what you actually cleared. Killed it when the tooling caught up and the whole product became a day of vibe-coding. No moat left worth defending.",
    detail: [],
    stack: ["TypeScript", "Next.js", "Postgres"],
    status: { label: "Shut down", tone: "muted" },
  },
  {
    name: "AETHER",
    category: "Systems & Open Source",
    kind: "Personal Project",
    period: "2025",
    blurb:
      "Real-time C++ drone fleet backend. Packed-binary UDP telemetry into seqlock-synchronized fleet state with acquire/release ordering across dozens of drones, streamed to Palantir Foundry.",
    detail: [],
    stack: ["C++", "UDP", "Seqlock", "Palantir Foundry"],
    status: { label: "Source not yet public", tone: "muted" },
  },
  {
    name: "OpportunityEdu",
    category: "Systems & Open Source",
    kind: "JPMorgan Code for Good",
    period: "Nov 2024",
    blurb:
      "Teachers generate AI lesson plans and push them straight to a teaching calendar. Built for Opportunity International. I owned backend, AI, and database.",
    detail: [],
    stack: ["Next.js", "Firebase", "OpenAI", "TypeScript"],
    status: { label: "1st Place", tone: "amber" },
  },
];

export const education = [
  {
    school: "Ohio State University",
    degree: "B.S. Computer Science & Engineering",
    period: "Expected Dec 2026",
  },
];

export const now = [
  "Building MultAI",
  "Patching io_uring in the Linux kernel",
  "Finishing my B.S. at Ohio State",
];

export const about = [
  "I'm finishing CS at Ohio State in December. Most of what I've built sits under the product — a payments path that couldn't take another failure domain, an inference pipeline with 8 GB to work with, an agent runtime that has to check its own work.",
  "I like problems where the honest answer is a tradeoff. The best thing I shipped at JPMorgan was a service I talked myself out of building.",
  "Outside that: lifting, soccer, and unreasonable hours of poker \u2660 (net negative, thanks for asking).",
];
