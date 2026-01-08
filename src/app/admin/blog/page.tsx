import { requireAuth } from "@/lib/auth-server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function BlogPage() {
  const session = await requireAuth();

  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { comments: true },
      },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-forest font-serif">Blog Posts</h1>
          <p className="text-gray-600 mt-2">Manage your blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-lime hover:bg-lime/90 text-forest">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-md border border-gray-100/50 overflow-hidden">
        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">No blog posts yet.</p>
            <Link href="/admin/blog/new">
              <Button variant="outline">Create Your First Post</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.excerpt.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.category || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post._count.comments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.published ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/blog/${post.id}`}>
                        <Button variant="ghost" size="sm">Edit</Button>
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

