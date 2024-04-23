import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ClubHeader } from "./club-header";
import { ChannelType, MemberRole, Channel } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClubSearch } from "./club-search";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ClubSection } from "./club-section";
import { ClubChannel } from "./club-channel";
import { ClubMember } from "./club-member";

interface ClubSidebarProps {
  clubId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
};

export const ClubSidebar = async ({ clubId }: ClubSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
  }

  const club = await db.club.findUnique({
    where: {
      id: clubId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  // Get all of the channels for each type
  const textChannels = club?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = club?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = club?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  // Get all the members for each club
  const members = club?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!club) {
    redirect("/");
  }

  // Check for profile status in club (Admin...)
  const role = club.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#eaf0fa]">
      <ClubHeader club={club} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ClubSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ClubSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ClubChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  club={club}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ClubSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ClubChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  club={club}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ClubSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ClubChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  club={club}
                />
              ))}
            </div>
          </div>
        )}

        {!!members?.length && (
          <div className="mb-2">
            <ClubSection
              sectionType="members"
              role={role}
              label="Members"
              club={club}
            />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ClubMember key={member.id} member={member} club={club} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
