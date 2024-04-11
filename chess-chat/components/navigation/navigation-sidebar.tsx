import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { NaviationAction } from "./navigation-action";
import { redirect } from "next/navigation";
import { NavigationItem } from "./naviagtion-item";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const clubs = await db.club.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22]">
      <NaviationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {clubs.map((club) => (
          <div key={club.id} className="mb-4">
            <NavigationItem 
            id={club.id}
            name={club.name}
            imageUrl={club.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
