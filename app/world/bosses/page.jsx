import { permanentRedirect } from "next/navigation";

export default function LegacyBossesPage() {
  permanentRedirect("/wiki/enemies/");
}
