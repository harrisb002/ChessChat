"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod" 
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
    name:  z.string().min(1, {
        message: "Club name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Club image is required."
    })
})

export const InitialModal = () => {
    const form = useForm({
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    })
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize you Club
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your club a personality with a name and image. Can be changed later.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
