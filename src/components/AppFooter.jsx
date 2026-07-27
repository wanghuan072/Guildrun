import Image from "next/image";
import Link from "next/link";
import { navigationData } from "@/src/components/site/navigation";
import { siteConfig } from "@/src/seo/siteConfig";

export default function AppFooter() {
  const legalLinks = [
    ["Privacy Policy", "/legal/privacy-policy/"],
    ["Terms of Service", "/legal/terms-of-service/"],
    ["Copyright", "/legal/copyright/"],
    ["About Us", "/legal/about-us/"],
    ["Contact Us", "/legal/contact-us/"],
  ];
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link className="brand-link" href="/">
              <Image
                className="brand-mark"
                src="/images/logo.png"
                alt=""
                width={44}
                height={44}
              />
              <span>Guildrun</span>
            </Link>
            <p>
              A connected Guildrun guide for learning the run loop, comparing
              heroes and databases, and turning each reward into a clearer
              formation decision.
            </p>
          </div>

          <nav className="footer-navigation" aria-label="Footer navigation">
            <div>
              <h2>Navigate</h2>
              {navigationData.map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <h2>Legal</h2>
              {legalLinks.map(([label, href]) => (
                <Link href={href} key={href} rel="noopener noreferrer nofollow">
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer-legal">
          <p>Copyright © {year} {siteConfig.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
