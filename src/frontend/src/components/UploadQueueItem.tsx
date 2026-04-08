import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";
import type { UploadingFile } from "../types";
import { formatFileSize, getFileIcon } from "../utils/fileUtils";

interface UploadQueueItemProps {
  item: UploadingFile;
  onCancel: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function UploadQueueItem({
  item,
  onCancel,
  onDismiss,
}: UploadQueueItemProps) {
  const Icon = getFileIcon(item.mimeType, item.name);

  return (
    <div
      data-ocid="upload-queue-item"
      className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
    >
      {/* File type icon */}
      <div className="flex-shrink-0 w-9 h-9 rounded-md bg-muted flex items-center justify-center mt-0.5">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium truncate text-foreground leading-tight">
            {item.name}
          </p>
          <div className="flex items-center gap-1 flex-shrink-0">
            {item.status === "done" && (
              <CheckCircle2 className="w-4 h-4 text-chart-3" />
            )}
            {item.status === "error" && (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
            {item.status === "uploading" && (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
              onClick={() =>
                item.status === "uploading"
                  ? onCancel(item.id)
                  : onDismiss(item.id)
              }
              aria-label={
                item.status === "uploading" ? "Cancel upload" : "Dismiss"
              }
              data-ocid="upload-item-dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {formatFileSize(item.fileSize)}
          </span>
          {item.status === "done" && (
            <Badge
              variant="secondary"
              className="text-xs py-0 px-1.5 bg-chart-3/10 text-chart-3 border-chart-3/20"
            >
              Done
            </Badge>
          )}
          {item.status === "error" && (
            <span className="text-xs text-destructive truncate">
              {item.errorMessage}
            </span>
          )}
          {item.status === "uploading" && (
            <span className="text-xs text-muted-foreground">
              {item.progress}%
            </span>
          )}
        </div>

        {item.status === "uploading" && (
          <Progress value={item.progress} className="h-1 mt-2 bg-muted" />
        )}
      </div>
    </div>
  );
}
