import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Work } from "@/components/site/work";
import { Projects } from "@/components/site/projects";
import { About } from "@/components/site/about";
import { Contact, Footer } from "@/components/site/contact";
import { CommandPalette } from "@/components/site/command-palette";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
