import { ClubSidebar } from "@/components/club/club-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ClubIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clubId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn;
  }

  const club = await db.club.findUnique({
    where: {
      id: params.clubId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!club) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ClubSidebar clubId={params.clubId}/>
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ClubIdLayout;
