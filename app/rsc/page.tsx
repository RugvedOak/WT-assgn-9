import type { Metadata } from "next";
import Link from "next/link";
import { LikeButton } from "@/components/LikeButton";
import { StrategyLabel } from "@/components/StrategyLabel";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "RSC demonstration" };
export const revalidate = 300;

export default async function RscPage() {
  const posts = (await getPosts({ revalidate: 300 })).slice(0, 8);

  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">Server-first by default</p>
        <h1 className="section-title">React Server Components</h1>
        <p className="lead">This page fetches its post list in an asynchronous Server Component before rendering.</p>
        <div style={{ marginTop: 20 }}><StrategyLabel>Rendering Architecture: RSC</StrategyLabel></div>
      </section>
      <section className="container rsc-layout">
        <div>
          <aside className="explain-box"><strong>No `useEffect()` needed:</strong> initial data is fetched in this server component, so the page can render with the posts already available. The request is cached and revalidated every 300 seconds on this route.</aside>
          <div className="rsc-list" aria-label="Recent posts">
            {posts.map((post) => <div className="rsc-item" key={post.id}><span>{String(post.id).padStart(2, "0")}</span><Link href={`/posts/${post.id}`}>{post.title}</Link></div>)}
          </div>
        </div>
        <aside className="rsc-aside">
          <h2>Server and client</h2>
          <p>The list and data fetching stay on the server. The small counter below is a Client Component because it needs browser state and click handling.</p>
          <LikeButton />
        </aside>
      </section>
      <section className="container" style={{ paddingBottom: 58 }}>
        <aside className="explain-box"><strong>Different questions:</strong> RSC describes where components execute and what they can do. It does not dictate SSG, ISR, or SSR. This RSC route uses cached data with a 300-second revalidation window; a Server Component can also participate in a dynamically rendered route.</aside>
      </section>
    </>
  );
}