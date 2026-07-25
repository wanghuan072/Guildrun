import { permanentRedirect } from "next/navigation";

export default function LegacyProgressionPage() {
  permanentRedirect("/gameplay/growth-route/");
}
