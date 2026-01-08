import { db } from "@/lib/db";
import { ProjectsContent } from "@/components/sections/ProjectsContent";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Our Projects",
  description: "Explore our sustainability and ESG projects",
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return <ProjectsContent projects={projects} />;
}

