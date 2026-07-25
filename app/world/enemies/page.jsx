import { permanentRedirect } from "next/navigation";

export default function LegacyWorldEnemiesPage() {
  permanentRedirect("/wiki/enemies/");
}
