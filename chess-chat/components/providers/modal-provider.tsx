"use client";

import { useEffect, useState } from "react";
import { CreateClubModal } from "@/components/modals/create-club-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditClubModal } from "@/components/modals/edit-club-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";

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
    </>
  );
};
