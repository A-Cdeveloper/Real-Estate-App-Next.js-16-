import {
  LayoutDashboard,
  List,
  Settings,
  Bell,
  UserIcon,
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
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Users", href: "/users", icon: Users },
  { label: "Profile", href: "/profile", icon: UserIcon },
  { label: "Settings", href: "/settings", icon: Settings },
];
