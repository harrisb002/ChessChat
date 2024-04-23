import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: {
    memberId: string;
    clubId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      clubId: params.clubId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  // Combination of the currently logged in user and the one being clicked on
  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/clubs/${params.clubId}`); // Automatically join the general channel
  }

  // Get both members of the conversation
  const { memberOne, memberTwo } = conversation;

  // Make sure its the other member (the one being talking to)
  // As either could have initiated the conversation
  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        clubId={params.clubId}
        type={"conversation"}
      />
    </div>
  );
};

export default MemberIdPage;
