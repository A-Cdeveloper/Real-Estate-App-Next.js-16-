import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/components/backend/layout/sidebar/sidebarStore";

const SidebarToggle = () => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsCollapsed((prev) => !prev)}
      className={cn(
        "mb-2 w-full",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      <span className="sr-only">
        {isCollapsed ? "Open sidebar" : "Close sidebar"}
      </span>
      {isCollapsed ? (
        <ChevronRight className="size-5" />
      ) : (
        <ChevronLeft className="size-5" />
      )}
    </Button>
  );
};

export default SidebarToggle;
