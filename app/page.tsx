"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Terminal,
  Code2,
  Zap,
  Trophy,
  ArrowRight,
  Dot,
  Download,
  Phone,
  Twitter,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for smooth scrolling
  const homeRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Effect to handle scroll-based navigation updates
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Get all section positions
      const homePosition = homeRef.current?.offsetTop || 0;
      const workPosition = workRef.current?.offsetTop || 0;
      const projectsPosition = projectsRef.current?.offsetTop || 0;
      const skillsPosition = skillsRef.current?.offsetTop || 0;

      // Determine which section is currently in view
      if (scrollPosition < workPosition) {
        setCurrentSection("home");
      } else if (scrollPosition < projectsPosition) {
        setCurrentSection("work");
      } else if (scrollPosition < skillsPosition) {
        setCurrentSection("projects");
      } else {
        setCurrentSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to section
  const scrollToSection = (section: string) => {
    console.log(`Scrolling to section: ${section}`);
    setCurrentSection(section);
    let targetRef: HTMLElement | null = null;

    switch (section) {
      case "home":
        targetRef = homeRef.current;
        break;
      case "work":
        targetRef = workRef.current;
        break;
      case "projects":
        targetRef = projectsRef.current;
        break;
      case "about":
        targetRef = skillsRef.current;
        break;
    }

    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`Target ref not found for section: ${section}`);
    }
  };

  // Function to handle resume download
  const handleResumeDownload = () => {
    console.log("Resume download clicked");
    // Open the resume PDF in a new tab for download
    window.open("/resume.pdf", "_blank");
  };

  // Function to handle GitHub click
  const handleGitHubClick = () => {
    console.log("GitHub button clicked");
    window.open("https://github.com/uzi101", "_blank");
  };

  // Function to handle experience card click
  const handleExperienceClick = (company: string) => {
    // You can add more specific functionality here, like opening a modal with details
    console.log(`Clicked on ${company} experience`);
    // For now, we'll just log it, but you could open a modal or navigate to a detailed page
  };

  // Function to handle project card click
  const handleProjectClick = (projectName: string) => {
    console.log(`Project card clicked: ${projectName}`);
    switch (projectName) {
      case "Baraka":
        window.open("https://github.com/uzi101/baraka-backend", "_blank");
        break;
      default:
        console.log(`Clicked on ${projectName} project`);
    }
  };

  const experiences = [
    {
      company: "JPMorgan Chase & Co.",
      role: "Software Engineering Intern",
      period: "Jun 2025 – Aug 2025",
      location: "Columbus, OH",
      highlights: [
        "500K+ daily transactions streamed",
        "Kafka & Java",
        "Real-time fraud detection",
      ],
      description:
        "Built high-throughput Kafka consumers and producers for real-time fraud detection systems.",
    },
    {
      company: "Paws AI",
      role: "Software Engineering Intern",
      period: "Jan 2025 – Jul 2025",
      location: "Columbus, OH",
      highlights: [
        "10 clinics deployed",
        "30% efficiency gain",
        "FastAPI & React",
      ],
      description:
        "Engineered scalable backend services and deployed across multiple clinical operations.",
    },
    {
      company: "Snap Inc.",
      role: "Software Engineering Extern",
      period: "Sep 2024 – Nov 2024",
      location: "Remote",
      highlights: ["AR/VR development", "20% latency reduction", "Lens Studio"],
      description:
        "Created interactive AR lenses with dynamic animations and gesture controls.",
    },
    {
      company: "DRB Systems LLC",
      role: "Software Engineering Intern",
      period: "May 2024 – Aug 2024",
      location: "Akron, OH",
      highlights: ["CI/CD pipelines", "25% faster delivery", "Docker & AWS"],
      description:
        "Built automated deployment pipelines and containerized applications.",
    },
    {
      company: "Fee Dodger LLC",
      role: "Software Engineering Intern",
      period: "Nov 2023 – Aug 2024",
      location: "Remote",
      highlights: [
        "RESTful APIs with Node.js",
        "Stripe payment processing",
        "Scalable authentication",
      ],
      description:
        "Built scalable RESTful APIs and implemented Stripe payment processing.",
    },
  ];

  const skills = [
    {
      category: "Languages",
      items: ["Python", "Java", "C++", "Ruby", "JavaScript", "TypeScript"],
    },
    {
      category: "Backend",
      items: ["FastAPI", "Flask", "Django", "Spring Boot", "Node.js"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Angular"],
    },
    {
      category: "Cloud & Tools",
      items: ["AWS", "Docker", "Kafka", "PostgreSQL", "Firebase"],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: "all 0.3s ease",
          }}
        />
      </div>

      {/* Floating Navigation */}
      <nav className="fixed top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3">
          <div className="flex space-x-4 md:space-x-8">
            {["home", "work", "projects", "about"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                  currentSection === section
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="min-h-screen flex items-center justify-center px-4 md:px-6 relative pt-20 md:pt-0"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Terminal-style header */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-6 mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 text-sm">~/uzair-beg</span>
            </div>
            <div className="text-left font-mono text-xs md:text-sm">
              <div className="text-green-400">$ whoami</div>
              <div className="text-white mt-2">Uzair Beg</div>
              <div className="text-green-400 mt-4">$ cat role.txt</div>
              <div className="text-white mt-2">
                Software Engineer | CS Student @ Ohio State
              </div>
              <div className="text-green-400 mt-4">$ ls achievements/</div>
              <div className="text-white mt-2 text-xs md:text-sm">
                jpmorgan_intern.txt snapchat_extern.log hackathon_winner.yml
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            UZAIR BEG
          </h1>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
            <Badge
              variant="outline"
              className="border-white/20 text-white bg-white/5 backdrop-blur"
            >
              <Terminal className="w-4 h-4 mr-2" />
              CS @ Ohio State
            </Badge>
            <Badge
              variant="outline"
              className="border-white/20 text-white bg-white/5 backdrop-blur"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Hackathon Winner
            </Badge>
            <Badge
              variant="outline"
              className="border-white/20 text-white bg-white/5 backdrop-blur"
            >
              <Zap className="w-4 h-4 mr-2" />
              2x Founder
            </Badge>
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Building scalable systems at{" "}
            <span className="text-white font-semibold">JPMorgan Chase</span> and
            <span className="text-white font-semibold"> Snap Inc</span>.
            Passionate about fintech, backend development, and creating
            impactful software solutions!
          </p>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 px-4">
            <Button
              onClick={handleResumeDownload}
              className="bg-white text-black hover:bg-gray-200 font-semibold px-6 md:px-8 py-3 relative z-10 w-full md:w-auto"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
            <Button
              onClick={() =>
                (window.location.href = "mailto:uzairbeg11@gmail.com")
              }
              className="bg-white text-black hover:bg-gray-200 font-semibold px-6 md:px-8 py-3 relative z-10 w-full md:w-auto"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={() => scrollToSection("work")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={workRef} className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              <Code2 className="inline w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-4" />
              Experience
            </h2>
            <div className="w-16 md:w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="group">
                <Card
                  onClick={() => handleExperienceClick(exp.company)}
                  className="bg-gray-900/30 border-gray-700 hover:border-white/30 transition-all duration-500 hover:bg-gray-900/50 cursor-pointer"
                >
                  <CardContent className="p-4 md:p-8">
                    <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                      {/* Company & Role */}
                      <div className="md:col-span-2">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
                              {exp.role}
                            </h3>
                            <p className="text-base md:text-xl text-gray-300 font-semibold">
                              {exp.company}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                        </div>

                        <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                          {exp.description}
                        </p>

                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {exp.highlights.map((highlight, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-white/10 text-white border-white/20"
                            >
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex flex-col items-end text-right">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 backdrop-blur">
                          <div className="text-white font-mono text-xs md:text-sm mb-2">
                            {exp.period}
                          </div>
                          <div className="text-gray-400 text-xs md:text-sm flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Featured Projects
            </h2>
            <div className="w-16 md:w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Baraka Project */}
            <Card
              onClick={() => handleProjectClick("Baraka")}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700 hover:border-white/30 transition-all duration-500 group cursor-pointer relative z-10"
            >
              <CardContent className="p-4 md:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-2xl font-bold text-white">
                    Baraka
                  </h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs md:text-sm">
                    Active Development
                  </Badge>
                </div>

                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                  Fin-tech donation platform that rounds up transactions for
                  automated micro-donations to verified charities. Built with
                  PCI compliance and real-time processing.
                </p>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {["FastAPI", "Stripe", "Plaid", "PostgreSQL", "Firebase"].map(
                    (tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-white/20 text-white bg-white/5"
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </div>

                <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  <span className="text-xs md:text-sm">May 2025 – Present</span>
                </div>
              </CardContent>
            </Card>

            {/* Hackathon Winner */}
            <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-700/30 hover:border-yellow-500/50 transition-all duration-500 group relative z-10">
              <CardContent className="p-4 md:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-2xl font-bold text-white">
                    AI Curriculum Planner
                  </h3>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs md:text-sm">
                    <Trophy className="w-3 h-3 mr-1" />
                    1st Place
                  </Badge>
                </div>

                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                  Winner of J.P. Morgan Code for Good Hackathon. Placed 1st out
                  of 200+ teams building an AI-powered curriculum planning
                  system for educational institutions. (Not open source)
                </p>

                <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                  {["OpenAI", "Firebase", "Next.js", "TypeScript"].map(
                    (tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-white/20 text-white bg-white/5"
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </div>

                <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                  <Trophy className="w-4 h-4 mr-2" />
                  <span className="text-xs md:text-sm">November 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-16 md:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Tech Stack
            </h2>
            <div className="w-16 md:w-24 h-1 bg-white mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skillGroup, index) => (
              <Card
                key={index}
                className="bg-gray-900/30 border-gray-700 hover:border-white/30 transition-all duration-300 group"
              >
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-white group-hover:text-gray-200 transition-colors">
                    {skillGroup.category}
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    {skillGroup.items.map((skill, i) => (
                      <div
                        key={i}
                        className="flex items-center text-gray-300 hover:text-white transition-colors"
                      >
                        <Dot className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        <span className="text-xs md:text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        ref={contactRef}
        className="py-16 md:py-32 px-4 md:px-6 bg-gradient-to-t from-gray-900 to-black"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
            Let's Build Something
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed px-4">
            Always interested in discussing innovative projects, new
            opportunities, or just connecting with fellow developers and tech
            enthusiasts.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            <Card className="bg-gray-900/30 border-gray-700 hover:border-white/30 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Mail className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">
                  Email
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  uzairbeg11@gmail.com
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 border-gray-700 hover:border-white/30 transition-all duration-300">
              <CardContent className="p-4 md:p-6 text-center">
                <Phone className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-3 md:mb-4 text-gray-400" />
                <h3 className="font-semibold mb-2 text-sm md:text-base">
                  Phone
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">440-412-6300</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-4 md:px-6 py-3 bg-transparent w-full md:w-auto"
            >
              <Link
                href="https://calendly.com/uzairbeg11/30min"
                target="_blank"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendly
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-4 md:px-6 py-3 bg-transparent w-full md:w-auto"
            >
              <Link href="https://linkedin.com/in/uzair-beg" target="_blank">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-4 md:px-6 py-3 bg-transparent w-full md:w-auto"
            >
              <Link href="https://github.com/uzi101" target="_blank">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Uzair Beg. Crafted with code and creativity.
            </div>
            <div className="text-gray-500 text-xs font-mono">
              {'{ "status": "available_for_opportunities" }'}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
