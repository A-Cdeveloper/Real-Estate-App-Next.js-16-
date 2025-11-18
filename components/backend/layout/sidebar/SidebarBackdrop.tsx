import { useSidebarStore } from "@/components/backend/layout/sidebar/sidebarStore";
import { cn } from "@/lib/utils";

const SidebarBackdrop = () => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const setIsCollapsed = useSidebarStore((state) => state.setIsCollapsed);

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 bg-black/50 z-30 transition-opacity md:hidden",
        isCollapsed ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      onClick={() => setIsCollapsed(true)}
      aria-hidden="true"
    />
  );
};

export default SidebarBackdrop;
