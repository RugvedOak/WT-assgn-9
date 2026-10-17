import Link from "next/link";

export default function NotFound() {
  return (
    <section className="narrow section-block">
      <div className="notice">
        <p className="eyebrow">404 · Not found</p>
        <h1>That note isn’t here.</h1>
        <p>The requested post ID does not match a post in the JSONPlaceholder collection.</p>
        <Link className="error-link" href="/posts">Return to the post archive →</Link>
      </div>
    </section>
  );
}