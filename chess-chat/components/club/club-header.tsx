"use client";

import { ClubWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ClubHeaderProps {
  club: ClubWithMembersWithProfiles;
  role?: MemberRole;
}

export const ClubHeader = ({ club, role }: ClubHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neautral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hoverbg-zinc-700/50 transition">
          {club.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
