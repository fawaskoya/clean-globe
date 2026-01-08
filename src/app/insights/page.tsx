import { InsightsContent } from "@/components/sections/InsightsContent";
import { db } from "@/lib/db";

export const metadata = {
    title: "Insights & News",
    description: "Latest thinking on ESG, sustainability, and climate strategy from the CGC team.",
};

export default async function InsightsPage() {
    const posts = await db.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    const formattedPosts = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.createdAt.toISOString().split('T')[0],
        tags: JSON.parse(post.tags) as string[]
    }));

    return <InsightsContent posts={formattedPosts} />;
}
