import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, FolderOpen, Upload, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { DragEvent } from "react";
import { MAX_FILE_SIZE, useUpload } from "../hooks/useUpload";
import { UploadQueueItem } from "./UploadQueueItem";

const ACCEPT_STRING =
  "image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.csv,.odt";

interface UploadDropzoneProps {
  onClose?: () => void;
}

export function UploadDropzone({ onClose }: UploadDropzoneProps) {
  const {
    queue,
    enqueue,
    cancel,
    dismiss,
    clearCompleted,
    pendingCount,
    hasItems,
  } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      enqueue(Array.from(files));
    },
    [enqueue],
  );

  const handleDragEnter = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const doneCount = queue.filter((i) => i.status === "done").length;
  const maxMB = MAX_FILE_SIZE / 1024 / 1024;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-base font-semibold font-display text-foreground">
            Upload Files
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Images, videos, audio, and documents up to {maxMB} MB
          </p>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
            aria-label="Close upload panel"
            data-ocid="upload-panel-close"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Drop zone */}
      <button
        type="button"
        data-ocid="upload-dropzone"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={[
          "w-full mx-4 mt-4 rounded-xl border-2 border-dashed cursor-pointer transition-smooth",
          "flex flex-col items-center justify-center gap-3 py-8 px-4",
          isDragging
            ? "border-accent bg-accent/5 scale-[0.99]"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
        ].join(" ")}
        aria-label="Click or drag files here to upload"
      >
        <div
          className={[
            "w-12 h-12 rounded-full flex items-center justify-center transition-smooth",
            isDragging ? "bg-accent/20" : "bg-muted",
          ].join(" ")}
        >
          <Upload
            className={[
              "w-5 h-5 transition-smooth",
              isDragging ? "text-accent" : "text-muted-foreground",
            ].join(" ")}
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">or tap to browse</p>
        </div>

        {/* Hidden browser file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ACCEPT_STRING}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          onClick={(e) => {
            // Reset value so same file can be re-selected
            (e.target as HTMLInputElement).value = "";
          }}
          data-ocid="upload-file-input"
        />
      </button>

      {/* Mobile camera/gallery shortcuts */}
      <div className="flex gap-2 px-4 mt-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 text-xs h-9"
          onClick={() => fileInputRef.current?.click()}
          data-ocid="upload-browse-btn"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          Browse Files
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 text-xs h-9"
          onClick={() => cameraInputRef.current?.click()}
          data-ocid="upload-camera-btn"
        >
          <Camera className="w-3.5 h-3.5" />
          Camera
        </Button>
        {/* Camera capture input (mobile) */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          className="hidden"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          onClick={(e) => {
            (e.target as HTMLInputElement).value = "";
          }}
          data-ocid="upload-camera-input"
        />
      </div>

      {/* Upload queue */}
      {hasItems && (
        <div className="flex-1 flex flex-col px-4 mt-4 min-h-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Queue · {queue.length} file{queue.length !== 1 ? "s" : ""}
              {pendingCount > 0 && (
                <span className="text-primary ml-1">
                  ({pendingCount} uploading)
                </span>
              )}
            </p>
            {doneCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-muted-foreground px-2"
                onClick={clearCompleted}
                data-ocid="upload-clear-done"
              >
                Clear done
              </Button>
            )}
          </div>
          <ScrollArea className="flex-1">
            <div className="space-y-2 pb-4">
              {queue.map((item) => (
                <UploadQueueItem
                  key={item.id}
                  item={item}
                  onCancel={cancel}
                  onDismiss={dismiss}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {!hasItems && (
        <div className="px-4 mt-4">
          <div className="rounded-lg bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground font-medium mb-1.5">
              Supported formats
            </p>
            <div className="flex flex-wrap gap-1">
              {[
                "JPG",
                "PNG",
                "GIF",
                "WebP",
                "MP4",
                "MOV",
                "MP3",
                "WAV",
                "PDF",
                "DOCX",
                "XLSX",
                "PPTX",
                "TXT",
              ].map((fmt) => (
                <span
                  key={fmt}
                  className="text-xs bg-card border border-border rounded px-1.5 py-0.5 text-muted-foreground"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
