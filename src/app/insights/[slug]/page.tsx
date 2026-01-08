import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import markdownToHtml from "@/lib/markdown";
import { Button } from "@/components/ui/Button";

import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
        title: post.title,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const contentHtml = await markdownToHtml(post.content);

    return (
        <div className="bg-cream py-24 sm:py-32">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <div className="mb-10">
                    <Link href="/insights" className="text-lime hover:text-forest font-semibold text-sm mb-4 inline-block">
                        ← Back to Insights
                    </Link>
                    <div className="flex gap-2 mb-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center rounded-full bg-lime/10 px-2 py-1 text-xs font-medium text-forest ring-1 ring-inset ring-lime/20">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-forest font-serif sm:text-5xl mb-4">
                        {post.title}
                    </h1>
                    <time dateTime={post.date} className="text-gray-500">
                        {post.date}
                    </time>
                </div>

                <article
                    className="prose prose-lg prose-slate mx-auto text-gray prose-headings:text-forest prose-headings:font-serif prose-a:text-lime hover:prose-a:text-forest prose-blockquote:border-l-lime/30"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                <div className="mt-16 border-t border-gray-200 pt-8">
                    <div className="bg-olive rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-cream font-serif mb-4">Have questions about this topic?</h3>
                        <p className="text-cream/80 mb-8">
                            Discuss these insights in the context of your operations.
                        </p>
                        <Button asChild variant="default" className="bg-lime hover:bg-lime/90 text-forest">
                            <Link href="/contact">Book a Consultation</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
