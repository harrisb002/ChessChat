"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UseOrigin } from "@/hooks/use-origin";
import { useState } from "react";

export const InviteModal = () => {
  const [copied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose, type, data } = useModal();
  const origin = UseOrigin();

  const isModalOpen = isOpen && type === "invite";

  // Extract the data from the club
  const { club } = data;

  // Create the invite URL based on origin from UseOrigin that finds window
  const inviteUrl = `${origin}/invite/${club?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dar:text-secondary/70">
            Club Invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-bkack focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button onClick={onCopy} size="icon">
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
          >
            Create Link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
