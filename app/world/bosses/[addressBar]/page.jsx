import { permanentRedirect } from "next/navigation";

export default async function LegacyBossDetailPage({ params }) {
  const { addressBar } = await params;
  permanentRedirect(`/wiki/enemies/${addressBar}/`);
}
