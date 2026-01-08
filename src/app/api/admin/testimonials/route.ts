import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { db } from "@/lib/db";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  role: z.string().optional(),
  content: z.string().min(1),
  image: z.string().optional(),
  rating: z.number().min(1).max(5),
  displayOrder: z.number().default(0),
  published: z.boolean().default(true),
});

export async function GET() {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = testimonialSchema.parse(body);

    const testimonial = await db.testimonial.create({
      data,
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

