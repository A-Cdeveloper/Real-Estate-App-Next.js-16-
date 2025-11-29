export type SidebarLink = {
  label: string;
  href: string;
  icon: string;
  adminOnly?: boolean;
};

export const navigationLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    adminOnly: true,
  },
  {
    label: "Proprietes",
    href: "/proprietes-area",
    icon: "List",
    adminOnly: false,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: "Bell",
    adminOnly: true,
  },
  { label: "News", href: "/news-editor", icon: "Book", adminOnly: true },
  { label: "Users", href: "/users", icon: "Users", adminOnly: true },
  { label: "Profile", href: "/profile", icon: "UserIcon", adminOnly: false },
  { label: "Settings", href: "/settings", icon: "Settings", adminOnly: true },
];
