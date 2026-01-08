import { requireAuth } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  BriefcaseIcon,
  FolderIcon,
  DocumentTextIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

async function getDashboardStats() {
  const [services, projects, blogPosts, contacts] = await Promise.all([
    db.service.count(),
    db.project.count(),
    db.blogPost.count(),
    db.contactSubmission.count({
      where: { read: false },
    }),
  ]);

  const recentContacts = await db.contactSubmission.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return {
    services,
    projects,
    blogPosts,
    unreadContacts: contacts,
    recentContacts,
  };
}

export default async function DashboardPage() {
  const session = await requireAuth();

  const stats = await getDashboardStats();

  const statCards = [
    {
      name: "Services",
      value: stats.services,
      icon: BriefcaseIcon,
      color: "bg-lime/10 text-lime",
    },
    {
      name: "Projects",
      value: stats.projects,
      icon: FolderIcon,
      color: "bg-blue-100 text-blue-600",
    },
    {
      name: "Blog Posts",
      value: stats.blogPosts,
      icon: DocumentTextIcon,
      color: "bg-purple-100 text-purple-600",
    },
    {
      name: "Unread Enquiries",
      value: stats.unreadContacts,
      icon: EnvelopeIcon,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest font-serif">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-3xl p-6 shadow-md border border-gray-100/50 hover:border-lime/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-forest mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Contact Enquiries */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 p-6">
        <h2 className="text-xl font-bold text-forest font-serif mb-4">Recent Contact Enquiries</h2>
        {stats.recentContacts.length === 0 ? (
          <p className="text-gray-500">No contact enquiries yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contact.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {contact.service || "General"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {contact.read ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Read
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/contacts/${contact.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

