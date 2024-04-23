import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ClubIdPageProps {
  params: {
    clubId: string;
  };
}

const ClubPage = async ({ params }: ClubIdPageProps) => {
  
  const profile = await currentProfile();

  if(!profile) {
    return redirectToSignIn();
  }

  const club = await db.club.findUnique({
    where: {
      id: params.clubId,
      members: {
        some: {
          profileId: profile.id  //Must be a member
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general" // Cannot rename/delete this channel
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  })

  const initialChannel = club?.channels[0];

  if(initialChannel?.name !== "general") { // Making certain that this cannot happen
    return null;
  }
  
  // Redirect to initial channel
  redirect(`/clubs/${params.clubId}/channels/${initialChannel?.id}`);

  return <div> Club ID Page</div>;
};

export default ClubPage;
