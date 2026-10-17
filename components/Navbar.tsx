import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/rsc", label: "RSC Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/performance", label: "Performance" },
];

export function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Fieldnotes home">
          <span className="brand-mark" aria-hidden="true">f</span> Fieldnotes
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {links.map((link) => (
            <Link className={link.href === "/dashboard" ? "nav-cta" : undefined} href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}