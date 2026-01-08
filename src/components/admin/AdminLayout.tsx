"use client";

import { AdminSidebar } from "./AdminSidebar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="flex h-screen">
        <AdminSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-20 bg-cream border-b border-gray-200 px-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-forest font-serif">Admin Dashboard</h2>
                <p className="text-sm text-gray-600">Welcome back, {session?.user?.name}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-forest/70">
                  {session?.user?.role === "ADMIN" ? "Administrator" : "Editor"}
                </span>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="text-sm border-forest/20 text-forest hover:bg-forest/5"
                >
                  Sign Out
                </Button>
                <Link href="/" target="_blank">
                  <Button variant="ghost" className="text-sm">
                    View Site
                  </Button>
                </Link>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

