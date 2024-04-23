import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { NaviationAction } from "./navigation-action";
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
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#c6dce8] dark:bg-[#212225]">
      <NaviationAction />
      <Separator className="h-[2px] bg-[#152c50] dark:bg-[#454c67] rounded-md w-full mx-auto" />
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
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
