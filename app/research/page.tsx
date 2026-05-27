import { ProjectCard } from "@/components/site/project-card";
import { SiteFooter } from "@/components/site/site-footer";
import { getHomePageData } from "@/lib/content";

export default async function ResearchPage() {
  const data = await getHomePageData();

  // Filter and sort projects
  const masters = data.research.projects
    .filter((p) => p.projectNumber > 1)
    .sort((a, b) => b.projectNumber - a.projectNumber);
  
  const bachelors = data.research.projects
    .filter((p) => p.projectNumber === 1);

  return (
    <main className="px-4 pb-12 sm:px-6 lg:px-10 pt-2 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-14 pt-4 sm:pt-6">
          {/* Master's Projects Section */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl">
              Master&apos;s Project
            </h2>
            <div className="space-y-6 pt-2">
              {masters.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* Bachelor's Projects Section */}
          <div className="space-y-6">
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl pt-4">
              Bachelor&apos;s Project
            </h2>
            <div className="space-y-6 pt-2">
              {bachelors.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>

        <SiteFooter links={data.contact.links} />
      </div>
    </main>
  );
}
