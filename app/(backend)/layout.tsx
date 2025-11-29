import BackHeader from "@/components/backend/layout/header/BackHeader";
import MainContent from "@/components/backend/layout/MainContent";

import React from "react";
import dynamic from "next/dynamic";
import SidebarWrapper from "@/components/backend/layout/sidebar/SidebarWrapper";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackHeader />
      <SidebarWrapper />
      <MainContent>{children}</MainContent>
      <Toaster />
    </>
  );
};

export default BackendLayout;
