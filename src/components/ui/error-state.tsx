import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
  onRetry,
  retryLabel = "Retry",
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("w-full p-6 border border-destructive/20 bg-destructive/5 rounded-lg text-center", className)}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="rounded-full">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
