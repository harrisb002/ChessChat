import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    // By the folder structure these params are garaunteed
    clubId: string;
    channelId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  // These should probably be unique, but can use them jointly to find user with id in the club
  const member = await db.member.findFirst({
    where: {
      clubId: params.clubId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect("/"); // Unauthorized acces, redirect home
  }

  return (
    <div className="bg-white dark:bg-[#2a2a33] flex flex-col h-full">
      <ChatHeader clubId={channel.clubId} name={channel.name} type="channel" />
      {/* apiUrl is where the messages will be fetched from. socketUrl is where new messages will be triggered */}
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              clubId: channel.clubId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />

          <ChatInput
            apiUrl="/api/socket/messages"
            query={{ channelId: channel.id, clubId: channel.clubId }}
            name={channel.name}
            type="channel"
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
