import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ClubSidebar } from "@/components/club/club-sidebar";

export const MobileToggle = ({ clubId }: { clubId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Only show on mobile */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ClubSidebar clubId={clubId} />
      </SheetContent>
    </Sheet>
  );
};
