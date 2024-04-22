"use client";

import { ClubWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { ActionTooltip } from "@/components/action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

// Create props for the club sections
interface ClubSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  club?: ClubWithMembersWithProfiles;
}

// Map the props and export
export const ClubSection = ({
  label,
  role,
  sectionType,
  channelType,
  club,
}: ClubSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div
      className="flex items-center justify-left
    py-2"
    >
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel" side="top" align={"start"}>
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="ml-2 w-4 h-4 " />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members" side="top" align={"start"}>
          <button
            onClick={() => onOpen("members", {club})}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="ml-2 w-4 h-4 " />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
