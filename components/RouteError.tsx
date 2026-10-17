"use client";

export function RouteError({ reset, title }: { reset: () => void; title: string }) {
  return (
    <section className="narrow section-block">
      <div className="notice" role="alert">
        <h1>{title}</h1>
        <p>We could not load this page right now. Check the connection to JSONPlaceholder and try again.</p>
        <button className="button-primary" onClick={reset} type="button">Try again</button>
      </div>
    </section>
  );
}