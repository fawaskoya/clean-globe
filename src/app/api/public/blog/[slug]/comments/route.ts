import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const commentSchema = z.object({
  authorName: z.string().min(1),
  authorEmail: z.string().email(),
  content: z.string().min(1),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await db.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const comments = await db.comment.findMany({
      where: {
        blogPostId: post.id,
        approved: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const data = commentSchema.parse(body);

    const post = await db.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const comment = await db.comment.create({
      data: {
        blogPostId: post.id,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        content: data.content,
        approved: false, // Requires admin approval
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

