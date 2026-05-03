"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SessionProvider } from "next-auth/react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginRoute = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginRoute && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [isLoginRoute, status, router]);

  // The login page must always render — even while the session call is
  // pending or returns an error. Otherwise a transient session-API failure
  // (e.g., misconfigured NEXTAUTH_URL on Vercel) traps the user on a spinner
  // and they cannot recover.
  if (isLoginRoute) {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  );
}
