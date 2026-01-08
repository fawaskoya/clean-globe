import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getServerSession() {
  const session = await auth();
  return session;
}

export async function requireAuth() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user?.role !== "ADMIN" && session.user?.role !== "EDITOR") {
    redirect("/admin/login");
  }
  return session;
}

