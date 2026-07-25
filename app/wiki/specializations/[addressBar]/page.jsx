import { permanentRedirect } from "next/navigation";

/** Fallback if a specialization slug is requested outside config redirects. */
export default function SpecializationRedirectPage() {
  permanentRedirect("/gameplay/growth-route/#rank-route");
}
