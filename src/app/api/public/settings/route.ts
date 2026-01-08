import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    let settings = await db.siteSettings.findFirst();

    if (!settings) {
      // Create default settings if none exist
      settings = await db.siteSettings.create({
        data: {
          id: "default",
          whatsappNumber: "+97412345678",
          whatsappMessage: "Hello! I'm interested in your services.",
        },
      });
    }

    return NextResponse.json({
      whatsappNumber: settings.whatsappNumber,
      whatsappMessage: settings.whatsappMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        whatsappNumber: "+97412345678",
        whatsappMessage: "Hello! I'm interested in your services.",
      },
      { status: 200 }
    );
  }
}

