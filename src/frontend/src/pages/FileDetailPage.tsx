import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Loader2,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import { FilePreview } from "../components/FilePreview";
import {
  useDeleteFile,
  useFileMetadata,
  useRenameFile,
} from "../hooks/useFileDetail";
import type { FileId } from "../types";
import {
  formatDate,
  formatFileSize,
  getCategoryLabel,
} from "../utils/fileUtils";

interface FileDetailPageProps {
  fileId: FileId;
  onBack: () => void;
}

export function FileDetailPage({ fileId, onBack }: FileDetailPageProps) {
  const { data: file, isLoading } = useFileMetadata(fileId);
  const deleteFile = useDeleteFile();
  const renameFile = useRenameFile();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) setEditName(file.name);
  }, [file]);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const fileUrl = file ? `https://storage.ic0.app/${file.id}` : "";

  function handleCopyLink() {
    const url = `${window.location.origin}?file=${fileId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard");
    });
  }

  function handleDownload() {
    if (!file) return;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = file.name;
    a.click();
  }

  async function handleRenameSubmit() {
    if (!file || !editName.trim() || editName === file.name) {
      setIsEditing(false);
      setEditName(file?.name ?? "");
      return;
    }
    try {
      await renameFile.mutateAsync({ fileId, newName: editName.trim() });
      toast.success("File renamed");
      setIsEditing(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Rename failed");
    }
  }

  async function handleDelete() {
    try {
      await deleteFile.mutateAsync(fileId);
      toast.success("File deleted");
      setDeleteOpen(false);
      onBack();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      data-ocid="file-detail-page"
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-subtle">
        <div className="flex items-center gap-3 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Back to library"
            data-ocid="file-detail-back"
            className="shrink-0 -ml-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRenameSubmit();
                    if (e.key === "Escape") {
                      setIsEditing(false);
                      setEditName(file?.name ?? "");
                    }
                  }}
                  className="h-8 text-sm"
                  data-ocid="file-rename-input"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={handleRenameSubmit}
                  disabled={renameFile.isPending}
                  aria-label="Save name"
                  data-ocid="file-rename-save"
                >
                  {renameFile.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => {
                    setIsEditing(false);
                    setEditName(file?.name ?? "");
                  }}
                  aria-label="Cancel rename"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 min-w-0">
                <h1
                  className="text-sm font-semibold font-display truncate text-foreground"
                  title={file?.name}
                >
                  {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    (file?.name ?? "Unknown file")
                  )}
                </h1>
                {file && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    onClick={() => setIsEditing(true)}
                    aria-label="Rename file"
                    data-ocid="file-rename-trigger"
                  >
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {file && !isEditing && (
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleCopyLink}
                aria-label="Copy shareable link"
                data-ocid="file-copy-link"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleDownload}
                aria-label="Download file"
                data-ocid="file-download"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setDeleteOpen(true)}
                aria-label="Delete file"
                data-ocid="file-delete-trigger"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex flex-col gap-4 p-4">
            <Skeleton
              className="w-full rounded-xl"
              style={{ aspectRatio: "16/9" }}
            />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ) : !file ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-lg font-medium text-foreground">
              File not found
            </p>
            <p className="text-sm text-muted-foreground">
              This file may have been deleted or moved.
            </p>
            <Button
              variant="outline"
              onClick={onBack}
              data-ocid="file-not-found-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to library
            </Button>
          </div>
        ) : (
          <>
            {/* Preview area */}
            <div className="w-full bg-muted/20 flex items-center justify-center p-4">
              <FilePreview
                fileUrl={fileUrl}
                mimeType={file.mimeType}
                fileName={file.name}
                className="w-full max-h-[55vh] min-h-[220px]"
              />
            </div>

            {/* Metadata panel */}
            <div className="bg-card border-t border-border p-4 space-y-4">
              {/* Category badge */}
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-medium px-2.5 py-0.5"
                  data-ocid="file-category-badge"
                >
                  {getCategoryLabel(file.category)}
                </Badge>
              </div>

              {/* Metadata rows */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <MetaRow label="File name" value={file.name} />
                <MetaRow label="File type" value={file.mimeType} />
                <MetaRow
                  label="File size"
                  value={formatFileSize(file.fileSize)}
                />
                <MetaRow label="Uploaded" value={formatDate(file.uploadedAt)} />
              </div>

              {/* Action buttons — full-width on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  className="flex-1 sm:flex-none"
                  onClick={handleDownload}
                  data-ocid="file-detail-download-btn"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={handleCopyLink}
                  data-ocid="file-detail-copy-link-btn"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy link
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none border-destructive/30 text-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteOpen(true)}
                  data-ocid="file-detail-delete-btn"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Delete confirmation */}
      <ConfirmDeleteModal
        open={deleteOpen}
        fileName={file?.name ?? ""}
        isDeleting={deleteFile.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground truncate" title={value}>
        {value}
      </p>
    </div>
  );
}
