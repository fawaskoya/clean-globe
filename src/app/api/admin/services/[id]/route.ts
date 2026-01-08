import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  fullDescription: z.string().min(1),
  image: z.string().optional(),
  deliverables: z.array(z.string()),
  timeline: z.string().min(1),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  published: z.boolean(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...service,
      deliverables: JSON.parse(service.deliverables),
      faqs: JSON.parse(service.faqs),
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const data = serviceSchema.parse(body);

    // Check if slug already exists for another service
    const existing = await db.service.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Service with this slug already exists" }, { status: 400 });
    }

    const service = await db.service.update({
      where: { id },
      data: {
        ...data,
        deliverables: JSON.stringify(data.deliverables),
        faqs: JSON.stringify(data.faqs),
      },
    });

    return NextResponse.json({
      ...service,
      deliverables: JSON.parse(service.deliverables),
      faqs: JSON.parse(service.faqs),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await db.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}

