"use client";

import { CreateClubModal } from "@/components/modals/create-club-modal";
import { useEffect, useState } from "react";

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
    </>
  );
};