import type { Metadata } from "next";
import { StrategyLabel } from "@/components/StrategyLabel";
import { getMockUser } from "@/lib/users";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getMockUser();
  const address = `${user.address.suite}, ${user.address.street}, ${user.address.city} ${user.address.zipcode}`;

  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">Your fieldnotes</p>
        <h1 className="section-title">A little dashboard</h1>
        <p className="lead">Profile details and activity, assembled on the server for this request.</p>
        <div style={{ marginTop: 20 }}><StrategyLabel>Rendering Strategy: SSR</StrategyLabel></div>
      </section>
      <section className="container dashboard-grid">
        <article className="dashboard-card">
          <h2>Profile</h2>
          <p className="profile-name">{user.name}</p>
          <p className="muted" style={{ marginTop: 0 }}>@{user.username}</p>
          <dl className="detail-list">
            <div><dt>Email</dt><dd><a className="text-link" href={`mailto:${user.email}`}>{user.email}</a></dd></div>
            <div><dt>Website</dt><dd><a className="text-link" href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a></dd></div>
          </dl>
        </article>
        <article className="dashboard-card">
          <h2>Organization</h2>
          <dl className="detail-list">
            <div><dt>Company</dt><dd>{user.company.name}</dd></div>
            <div><dt>About</dt><dd>{user.company.catchPhrase}</dd></div>
            <div><dt>Address</dt><dd>{address}</dd></div>
          </dl>
        </article>
        <article className="dashboard-card">
          <h2>Activity snapshot</h2>
          <div className="stat-number">12</div><p className="stat-caption">notes available in the archive</p>
          <hr style={{ border: 0, borderTop: "1px solid var(--line)", margin: "20px 0" }} />
          <div className="stat-number">60s</div><p className="stat-caption">post refresh window</p>
        </article>
      </section>
      <section className="container" style={{ paddingBottom: 50 }}>
        <aside className="explain-box"><strong>Server-Side Rendering:</strong> this route is forced dynamic and fetches with `cache: &quot;no-store&quot;`, so the server renders it for incoming requests. Profile data comes from JSONPlaceholder. This is a public mock endpoint, not real authentication or a private account.</aside>
      </section>
    </>
  );
}