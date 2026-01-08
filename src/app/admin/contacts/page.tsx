import { requireAuth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function ContactsPage() {
  const session = await requireAuth();

  const contacts = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest font-serif">Contact Enquiries</h1>
        <p className="text-gray-600 mt-2">
          {unreadCount > 0 && (
            <span className="text-orange-600 font-semibold">{unreadCount} unread</span>
          )}{" "}
          Manage contact form submissions
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 overflow-hidden">
        {contacts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No contact enquiries yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className={`hover:bg-gray-50 ${!contact.read ? "bg-orange-50/50" : ""}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      {contact.company && (
                        <div className="text-sm text-gray-500">{contact.company}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {contact.service || "General"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {contact.read ? (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Read
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                            Unread
                          </span>
                        )}
                        {contact.processed && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Processed
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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

