import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ClubHeader } from "./club-header";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";

interface ClubSidebarProps {
  clubId: string;
}

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
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ClubHeader club={club} role={role} />
    </div>
  );
};
