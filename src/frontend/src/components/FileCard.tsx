import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import type { FileMetadata } from "../types";
import {
  formatDate,
  formatFileSize,
  getFileIcon,
  isImageFile,
  isVideoFile,
} from "../utils/fileUtils";

interface FileCardProps {
  file: FileMetadata;
  onClick?: (file: FileMetadata) => void;
}

export function FileCard({ file, onClick }: FileCardProps) {
  const isImage = isImageFile(file.mimeType, file.name);
  const isVideo = isVideoFile(file.mimeType, file.name);
  const Icon = getFileIcon(file.mimeType, file.name);
  const hasPreview = isImage || isVideo;
  const fileUrl = hasPreview ? `/api/file/${file.id}` : null;

  return (
    <button
      type="button"
      className={cn(
        "group relative flex flex-col w-full text-left rounded-xl border border-border bg-card overflow-hidden transition-smooth cursor-pointer",
        "hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      onClick={() => onClick?.(file)}
      data-ocid={`file-card-${file.id}`}
      aria-label={`${file.name}, ${formatFileSize(file.fileSize)}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/50 flex items-center justify-center">
        {hasPreview && fileUrl ? (
          <>
            {isImage ? (
              <img
                src={fileUrl}
                alt={file.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="relative w-full h-full bg-muted flex items-center justify-center">
                <Icon size={28} className="text-muted-foreground" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Play
                      size={16}
                      className="text-foreground ml-0.5"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
          </div>
        )}

        {/* Video badge */}
        {isVideo && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-background/80 backdrop-blur-sm border-0 text-foreground font-medium"
          >
            VIDEO
          </Badge>
        )}
      </div>

      {/* Metadata */}
      <div className="p-3 flex flex-col gap-0.5 min-w-0 w-full">
        <p
          className="text-sm font-medium text-foreground truncate leading-snug"
          title={file.name}
        >
          {file.name}
        </p>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-xs text-muted-foreground truncate">
            {formatDate(file.uploadedAt)}
          </span>
          <span className="text-xs text-muted-foreground whitespace-nowrap font-mono tabular-nums">
            {formatFileSize(file.fileSize)}
          </span>
        </div>
      </div>
    </button>
  );
}

export function FileCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-3 space-y-1.5">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
