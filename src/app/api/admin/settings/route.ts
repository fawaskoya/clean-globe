import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const settingsSchema = z.object({
  whatsappNumber: z.string().optional(),
  whatsappMessage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleSearchConsole: z.string().optional(),
  announcementEnabled: z.boolean().optional(),
  announcementText: z.string().optional().nullable(),
  announcementLink: z.string().optional().nullable(),
});

export async function GET() {
  const session = await auth();
  
  if (!session || ((session.user as any)?.role !== "ADMIN" && (session.user as any)?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let settings = await db.siteSettings.findFirst();

    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          id: "default",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await auth();
  
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = settingsSchema.parse(body);
    // Drop nulls from the form for nullable optional columns handled as strings
    const data = Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => v !== undefined)
    ) as typeof parsed;

    let settings = await db.siteSettings.findFirst();

    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          id: "default",
          ...data,
        },
      });
    } else {
      settings = await db.siteSettings.update({
        where: { id: settings.id },
        data,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

