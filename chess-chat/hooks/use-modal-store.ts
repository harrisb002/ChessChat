import { create } from "zustand";

export type ModalType = "createClub";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (type: ModalType) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
