import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const passwordToCheck = searchParams.get('password');

        const userCount = await db.user.count();
        const adminUser = await db.user.findUnique({
            where: { email: "admin@thecleanglobe.com" },
        });

        let passwordMatch = false;
        let hashSample = "none";

        if (adminUser && passwordToCheck) {
            passwordMatch = await bcrypt.compare(passwordToCheck, adminUser.password);
            hashSample = adminUser.password.substring(0, 10) + "...";
        }

        return NextResponse.json({
            status: "Online",
            userCount,
            adminFound: !!adminUser,
            passwordProvided: !!passwordToCheck,
            passwordMatch: passwordMatch,
            hashStored: !!adminUser?.password,
            hashPrefix: hashSample
        });
    } catch (error) {
        return NextResponse.json({ error: "DB connection failed", details: String(error) }, { status: 500 });
    }
}
