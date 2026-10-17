import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  const excerpt = post.body.length > 122 ? `${post.body.slice(0, 122).trimEnd()}…` : post.body;

  return (
    <article className="post-card">
      <span className="post-number">FIELDNOTE {String(post.id).padStart(2, "0")}</span>
      <h2><Link href={`/posts/${post.id}`}>{post.title}</Link></h2>
      <p>{excerpt}</p>
      <Link className="text-link" href={`/posts/${post.id}`}>Read note <span aria-hidden="true">→</span></Link>
    </article>
  );
}