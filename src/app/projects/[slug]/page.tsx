import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/sections/ProjectDetailContent";

export async function generateStaticParams() {
  const projects = await db.project.findMany({
    where: { published: true },
  });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
  });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Clean Globe Consultancy`,
    description: project.metaDescription || project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await db.project.findUnique({
    where: { slug },
  });

  if (!project || !project.published) {
    notFound();
  }

  // Parse images JSON and other necessary transformations
  const projectData = {
    ...project,
    images: JSON.parse(project.images || "[]"),
  };

  return <ProjectDetailContent project={projectData} />;
}

