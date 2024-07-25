import { getUserProfile } from "@/actions/update-profile.actions";
import { auth } from "@/auth";
import LinkMain from "@/components/link/LinkMain";
import { getLinks } from "@/lib/link";
import { redirect } from "next/navigation";

export default async function LinkPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const links = await getLinks();
  const userProfile = await getUserProfile(session?.user?.email as string);
  return <LinkMain userProfile={userProfile} links={links} />;
}
