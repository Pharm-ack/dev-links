import { auth } from "@/auth";
import BackToEditor from "@/components/preview/BackToEditor";
import CopyLinkToClipboard from "@/components/share-view/CopyLinkToClickboard";
import IconArrowRight from "@/components/svg/IconArrowRight";
import { getLinks } from "@/lib/link";
import { getUserByEmail } from "@/lib/user";
import Image from "next/image";
import Link from "next/link";

async function ProfilePage() {
  const links = await getLinks();
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <>
      <nav className="flex w-full sm:hidden items-center justify-between py-4 px-6 z-30 sm:bg-white sm:mt-4 rounded-2xl">
        <BackToEditor />

        <CopyLinkToClipboard domain={process.env.NEXT_PUBLIC as string} />
      </nav>
      <div className="hidden sm:block bg-primary w-screen h-[300px] rounded-b-3xl sm:px-4">
        <nav className="flex w-full items-center justify-between py-4 px-6 z-30 sm:bg-white sm:mt-4 rounded-2xl">
          <Link
            href={"/links"}
            className="border border-primary rounded-md py-2 text-md font-semibold text-sm text-primary hover:bg-hover-foreground/50 px-4"
          >
            Back to Editor
          </Link>
          <CopyLinkToClipboard
            // username={username}
            domain={process.env.NEXT_PUBLIC as string}
          />
        </nav>
      </div>
      <section className="flex flex-col gap-4 justify-center items-center mt-12 sm:rounded-2xl sm:top-[120px] sm:left-[50%] sm:right-[50%] sm:-translate-x-[50%] sm:w-fit sm:z-50 sm:bg-white sm:absolute sm:py-10 sm:px-12">
        {user?.image ? (
          <Image
            width={104}
            height={104}
            className="h-[104px] w-[104px] object-cover rounded-full border-4 border-primary"
            alt="profile photo"
            src={user?.image as string}
          />
        ) : (
          <div className="h-[104px] w-[104px] rounded-full border-4 border-primary flex items-center justify-center">
            <span className="text-4xl text-primary">?</span>
          </div>
        )}

        {user?.first_name && user?.last_name ? (
          <h1 className="heading-m text-darkgrey text-nowrap">
            {user?.first_name + " " + user?.last_name}
          </h1>
        ) : (
          <h1 className="heading-m text-darkgrey text-nowrap">Your name...</h1>
        )}

        <p className="text-grey">{user?.email}</p>
        <div className="flex flex-col mt-8 gap-4">
          {links &&
            links.length > 5 &&
            links.slice(0, 5).map((link) => (
              <Link
                href={link.url}
                target="_blank"
                key={link.id}
                style={{ backgroundColor: link.platform.brandColor }}
                className="relative flex items-center gap-2 min-w-[240px] text-white fill-white rounded-md px-4 py-4"
              >
                {link.platform.icon}
                <span className="ml-8">{link.platform.name}</span>
                <IconArrowRight color="fill-white ml-auto" />
              </Link>
            ))}
          {links &&
            links.length <= 5 &&
            links.map((link) => (
              <Link
                href={link.url}
                target="_blank"
                key={link.id}
                style={{ backgroundColor: link.platform.brandColor }}
                className="relative flex items-center gap-2 min-w-[240px] text-white fill-white rounded-md px-4 py-4"
              >
                {link.platform.icon}
                <span className="ml-8">{link.platform.name}</span>
                <IconArrowRight color="fill-white ml-auto" />
              </Link>
            ))}

          {!links.length && <p className="text-center">No links found</p>}
        </div>
      </section>
      {(!user?.first_name || !user?.last_name || !user?.image) && (
        <div className="absolute bottom-2 left-[50%] right-[50%] -translate-x-[50%] w-full text-center">
          Your profile is incomplete.
          <Link href="/profile" className="text-blue-500 ms-2 hover:underline">
            Complete your profile
          </Link>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
