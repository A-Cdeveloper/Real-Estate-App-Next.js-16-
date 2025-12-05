import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  message?: string;
  variant?: "default" | "destructive";
};

const EmptyState = ({
  title = "No items found",
  message,
  variant = "default",
}: EmptyStateProps) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Alert
        variant={variant}
        className="max-w-lg mx-auto mt-12 flex items-center justify-center gap-4 text-muted-foreground"
      >
        <Info className="h-8 w-8" />
        <div>
          <AlertTitle className="text-lg font-semibold">{title}</AlertTitle>
          <AlertDescription className="text-sm">{message}</AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default EmptyState;
