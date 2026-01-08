import { InsightsContent } from "@/components/sections/InsightsContent";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
    title: "Insights & News",
    description: "Latest thinking on ESG, sustainability, and climate strategy from the CGC team.",
};

export default function InsightsPage() {
    const posts = getAllPosts();
    return <InsightsContent posts={posts} />;
}
