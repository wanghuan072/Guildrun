import { permanentRedirect } from "next/navigation";

export default function LegacyKeywordsPage() {
  permanentRedirect("/wiki/status-effects/");
}
