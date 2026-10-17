import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { StrategyLabel } from "@/components/StrategyLabel";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Posts" };
export const dynamic = "force-static";

export default async function PostsPage() {
  const posts = (await getPosts()).slice(0, 12);

  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">The archive · 12 notes</p>
        <h1 className="section-title">Posts to wander through</h1>
        <p className="lead">A small selection of notes, generated as static HTML when this app is built.</p>
        <div style={{ marginTop: 20 }}><StrategyLabel>Rendering Strategy: SSG</StrategyLabel></div>
      </section>
      <section className="container list-grid">
        <aside className="explain-box"><strong>How SSG works:</strong> Next.js fetches the public post collection during `next build` and writes the page ahead of requests. Visitors receive the generated page without waiting for a per-request data fetch.</aside>
        <div className="post-grid">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
      </section>
    </>
  );
}