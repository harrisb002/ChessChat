import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodeProps {
  params: {
    inviteCode: string; // Matching on my folder directory
  };
}

const InviteCodePage = async ({ params }: InviteCodeProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params) {
    return redirect("/");
  }

  // Check if you is being invited is already a member of Club
  const existingClub = await db.club.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // If already joined, then return to home
  if (existingClub) {
    return redirect(`/clubs/${existingClub.id}`);
  }

  // Update the club with the new member using profileId, in the club using invite code
  const club = await db.club.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  // Redirect to that club if exists
  if (club) {
    return redirect(`/clubs/${club.id}`);
  }

  return null;
};

export default InviteCodePage;
