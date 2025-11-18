"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidebarToggle from "@/components/backend/layout/sidebar/SidebarToggle";
import { useSidebarStore } from "@/components/backend/layout/sidebar/sidebarStore";
import { navigationLinks } from "@/components/backend/layout/sidebar/links";

const Navigation = () => {
  const pathname = usePathname();
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <nav
      className={cn(
        "flex flex-1 flex-col ps-4 pe-2 py-2",
        // Mobile and desktop: depends on collapsed state
        isCollapsed
          ? "items-center space-y-2 ps-2 pe-3.5"
          : "items-start space-y-0"
      )}
    >
      <SidebarToggle />

      {navigationLinks.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className={cn(
              "flex items-center rounded-lg px-3 py-2 text-base font-semibold transition w-full hover:bg-primary/20 hover:text-foreground",
              // Mobile and desktop: depends on collapsed state
              isCollapsed ? "justify-center" : "justify-start gap-4",
              // Active state
              isActive ? "bg-secondary text-primary" : "text-muted-foreground "
            )}
          >
            <Icon className="size-5" />
            {/* Text is displayed when not collapsed (mobile and desktop) */}
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
