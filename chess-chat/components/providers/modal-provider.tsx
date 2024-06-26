"use client";

import { useEffect, useState } from "react";
import { CreateClubModal } from "@/components/modals/create-club-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditClubModal } from "@/components/modals/edit-club-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveClubModal } from "@/components/modals/leave-club-modal";
import { DeleteClubModal } from "@/components/modals/delete-club-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal.tsx";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";

export const ModalProvider = () => {
  // Prevent modals being rendered on serverside, gets rid of hydration errors
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateClubModal />
      <InviteModal />
      <EditClubModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveClubModal />
      <DeleteClubModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
