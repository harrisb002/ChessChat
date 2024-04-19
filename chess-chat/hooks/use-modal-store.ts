import { Club } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createClub" | "invite" | "editClub" | "members" | "createChannel" | "leaveClub" | "deleteClub";

interface ModalData {
  club?: Club;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
