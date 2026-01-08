import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const userCount = await db.user.count();
        const adminUser = await db.user.findUnique({
            where: { email: "admin@thecleanglobe.com" },
            select: { id: true, email: true, role: true } // Don't select password
        });

        return NextResponse.json({
            status: "Online",
            userCount,
            adminFound: !!adminUser,
            adminDetails: adminUser
        });
    } catch (error) {
        return NextResponse.json({ error: "DB connection failed", details: String(error) }, { status: 500 });
    }
}
