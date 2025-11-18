import {
  LayoutDashboard,
  List,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

export type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navigationLinks: SidebarLink[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Proprietes", href: "/proprietes-area", icon: List },
  { label: "Users", href: "/users", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];
