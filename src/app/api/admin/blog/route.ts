import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  image: z.string().optional(),
  tags: z.array(z.string()),
  category: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean(),
});

export async function GET() {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = blogPostSchema.parse(body);

    const existing = await db.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "Blog post with this slug already exists" }, { status: 400 });
    }

    const post = await db.blogPost.create({
      data: {
        ...data,
        tags: JSON.stringify(data.tags),
      },
    });

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags),
    }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

