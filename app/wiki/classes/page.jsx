import { permanentRedirect } from "next/navigation";

export default function LegacyClassesPage() {
  permanentRedirect("/heroes/");
}
