import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  // Attempt to find any club that the profile is a member of
  const club = await db.club.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  // Redirect them to the club they are part of
  if (club) {
    return redirect(`/clubs/${club.id}`);
  }

  // If not use a modal to create one

  return <InitialModal />;
};

export default SetupPage;
