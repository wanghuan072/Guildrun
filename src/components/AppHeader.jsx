"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigationData } from "@/src/components/site/navigation";
import { siteConfig } from "@/src/seo/siteConfig";

export default function AppHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="app-header">
      <a className="skip-link" href="#site-content">
        Skip to main content
      </a>
      <div className="header-shell">
        <Link className="brand-link" href="/" aria-label="Guildrun guide home">
          <Image
            className="brand-mark"
            src="/images/logo.png"
            alt=""
            width={44}
            height={44}
          />
          <span>Guildrun</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Toggle site navigation"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul className="primary-navigation-list">
            {navigationData.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li
                  className={item.children ? "navigation-group" : undefined}
                  key={item.label}
                >
                  <Link
                    className={isActive ? "navigation-link is-active" : "navigation-link"}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children ? (
                    <div className="navigation-dropdown">
                      <ul>
                        {item.children.map((child) => (
                          <li key={`${item.label}-${child.label}`}>
                            <Link href={child.href} onClick={() => setMenuOpen(false)}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
          <div className="mobile-navigation-actions">
            <Link href="/search/" onClick={() => setMenuOpen(false)}>
              Search guide
            </Link>
            <a
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Play Demo <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        <div className="header-actions">
          <Link className="header-search" href="/search/" aria-label="Search Guildrun guides and databases">
            <span aria-hidden="true">⌕</span>
          </Link>
          <a
            className="demo-button"
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Play Demo <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
}
