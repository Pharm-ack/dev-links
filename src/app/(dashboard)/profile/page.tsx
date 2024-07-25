import { getUserProfile } from "@/actions/update-profile.actions";
import { auth } from "@/auth";
import ProfileMain from "@/components/profile/ProfileMain";
import { getLinks } from "@/lib/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userProfile = await getUserProfile(session?.user?.email as string);
  const links = await getLinks();

  return <ProfileMain links={links} userProfile={userProfile} />;
}
