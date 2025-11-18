import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Logo from "@/components/shared/Logo";
import { Bell } from "lucide-react";

const BackHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 lg:px-8">
      <div className="flex items-center gap-3">
        <Logo />
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Bell className="size-4" />
        </Button>
        <ThemeToggle />
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="size-8 rounded-full bg-primary/20" />
          <div>
            <p className="text-sm font-semibold leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BackHeader;
