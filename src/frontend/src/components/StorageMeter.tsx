import { HardDrive } from "lucide-react";
import { useStorageStats } from "../hooks/useStorageStats";
import {
  MAX_STORAGE_BYTES,
  formatFileSize,
  getStoragePercentage,
} from "../utils/fileUtils";

export function StorageMeter() {
  const { data: stats, isLoading } = useStorageStats();

  const usedBytes = stats?.totalBytes ?? 0n;
  const pct = getStoragePercentage(usedBytes);
  const usedLabel = formatFileSize(usedBytes);
  const maxLabel = formatFileSize(MAX_STORAGE_BYTES);

  return (
    <div className="px-3 py-3 rounded-lg bg-muted/60 border border-border">
      <div className="flex items-center gap-2 mb-2">
        <HardDrive className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs font-medium text-muted-foreground">
          Storage
        </span>
      </div>
      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-2">
        {isLoading ? (
          <div className="h-full w-1/3 bg-primary/30 rounded-full animate-pulse" />
        ) : (
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-foreground font-medium">
          {isLoading ? "—" : usedLabel}
        </span>
        <span className="text-xs text-muted-foreground">{maxLabel} total</span>
      </div>
    </div>
  );
}
