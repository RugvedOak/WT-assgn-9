import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StrategyLabel } from "@/components/StrategyLabel";
import { getPost } from "@/lib/posts";

export const revalidate = 60;
export const dynamicParams = true;

type PostPageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return Array.from({ length: 10 }, (_, index) => ({ id: String(index + 1) }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(Number(id));
  return { title: post?.title ?? "Post not found" };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId < 1) notFound();

  const post = await getPost(postId);
  if (!post) notFound();

  return (
    <article className="narrow article">
      <Link className="text-link" href="/posts">← Back to all posts</Link>
      <div style={{ marginTop: 24 }}><StrategyLabel>Rendering Strategy: ISR</StrategyLabel></div>
      <h1>{post.title}</h1>
      <div className="article-meta"><span>Post ID {post.id}</span><span aria-hidden="true">·</span><span>JSONPlaceholder</span></div>
      <aside className="explain-box" style={{ marginTop: 25 }}><strong>Incremental Static Regeneration:</strong> This post is statically generated and cached. After 60 seconds, a later request can trigger regeneration; cached content may be served while the refreshed page is prepared.</aside>
      <div className="article-body">{post.body}</div>
    </article>
  );
}