import Link from "next/link";

export default function NotFound() {
  return <main className="page-main"><div className="container not-found-content"><div><span>404</span><h1>This route vanished into the Rift.</h1><p>The entry may have moved, changed with the Demo, or never joined the archive.</p><Link href="/">Return to the Guildrun guide →</Link></div></div></main>;
}
