import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Lazy load Toaster - only loads when needed (when toast is triggered)
const Toaster = dynamic(() =>
  import("@/components/ui/sonner").then((mod) => mod.Toaster)
);

export const metadata: Metadata = {
  title: `${APP_NAME} - Login`,
  description: APP_DESCRIPTION,
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <main id="main-content" className="min-h-screen" role="main">
        {children}
      </main>

      <Toaster />
    </>
  );
}
