import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/posts";

export const revalidate = 3600;

export default async function HomePage() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container fade-in">
          <p className="eyebrow">A small study in the shape of a blog</p>
          <h1 className="display-title">Ideas travel differently<br />when the server does.</h1>
          <p className="lead">Fieldnotes is a working demo of how pages are built, refreshed, and delivered with modern Next.js.</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/posts">Explore the notes <span aria-hidden="true">→</span></Link>
            <Link className="button-secondary" href="/dashboard">Open the dashboard</Link>
          </div>
        </div>
      </section>
      <section className="container section-block">
        <div className="strategy-strip" aria-label="Rendering approaches demonstrated">
          <div className="strategy-cell"><strong>SSG · build once</strong><p>The post index is generated during production build and served as static HTML.</p></div>
          <div className="strategy-cell"><strong>ISR · refresh in place</strong><p>Post pages are cached and can be regenerated after 60 seconds.</p></div>
          <div className="strategy-cell"><strong>SSR · request by request</strong><p>The dashboard fetches mock profile data without caching it.</p></div>
        </div>
      </section>
      <section className="container section-block" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <div><p className="eyebrow">From the notebook</p><h2 className="section-title">A few starting points</h2></div>
          <Link className="text-link" href="/posts">All posts <span aria-hidden="true">→</span></Link>
        </div>
        <div className="post-grid">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
      </section>
    </>
  );
}