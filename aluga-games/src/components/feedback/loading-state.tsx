import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type LoadingStateProps = {
  label?: string;
  rows?: number;
  className?: string;
};

export function LoadingState({
  label = "Carregando conteudo",
  rows = 3,
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("grid gap-3 rounded-lg border border-border bg-white p-5", className)}
    >
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-4", index === rows - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}
