import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  Download,
  FileWarning,
  MoreVertical,
  Pencil,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ExternalBlob,
  FileCategory,
  SortField,
  SortOrder,
  createActor,
} from "../backend";
import type { FileMetadata, ListFilesRequest } from "../types";
import type { UploadingFile } from "../types";
import {
  formatDate,
  formatFileSize,
  getCategoryLabel,
  getFileIcon,
  isImageFile,
  isVideoFile,
} from "../utils/fileUtils";

interface FilesPageProps {
  activeCategory: FileCategory | null;
  uploadOpen: boolean;
  onUploadClose: () => void;
  onFileClick?: (fileId: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
  page: bigint;
  onPageChange: (p: bigint | ((prev: bigint) => bigint)) => void;
}

const PAGE_SIZE = 12n;

export function FilesPage({
  activeCategory,
  uploadOpen,
  onUploadClose,
  onFileClick,
  search,
  onSearchChange,
  page,
  onPageChange,
}: FilesPageProps) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const qc = useQueryClient();

  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<FileMetadata | null>(null);
  const [renameTarget, setRenameTarget] = useState<FileMetadata | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const request: ListFilesRequest = {
    page: page - 1n,
    pageSize: PAGE_SIZE,
    sortField: SortField.uploadDate,
    sortOrder: SortOrder.desc,
    category: activeCategory ?? undefined,
    searchQuery: search.trim() || undefined,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["files", activeCategory, search, page.toString()],
    queryFn: async () => {
      if (!actor)
        return { files: [], totalCount: 0n, page: 0n, pageSize: PAGE_SIZE };
      return actor.listFiles(request);
    },
    enabled: !!actor && !actorFetching,
    placeholderData: (prev) => prev,
  });

  const deleteMutation = useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.deleteFile(fileId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("File deleted");
      setDeleteTarget(null);
      qc.invalidateQueries({ queryKey: ["files"] });
      qc.invalidateQueries({ queryKey: ["storageStats"] });
    },
    onError: (e) => toast.error(`Delete failed: ${(e as Error).message}`),
  });

  const renameMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.renameFile(id, name);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      toast.success("File renamed");
      setRenameTarget(null);
      qc.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (e) => toast.error(`Rename failed: ${(e as Error).message}`),
  });

  const handleFilePick = useCallback(
    async (files: FileList | null) => {
      if (!files || !actor) return;

      const newUploads: UploadingFile[] = Array.from(files).map((f) => ({
        id: `${f.name}-${Date.now()}`,
        name: f.name,
        progress: 0,
        status: "uploading",
        mimeType: f.type || "application/octet-stream",
        fileSize: f.size,
      }));

      setUploadingFiles((prev) => [...prev, ...newUploads]);
      onUploadClose();

      for (const file of Array.from(files)) {
        const uid = newUploads.find((u) => u.name === file.name)?.id;
        if (!uid) continue;
        try {
          const bytes = new Uint8Array(await file.arrayBuffer());
          const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
            (pct) => {
              setUploadingFiles((prev) =>
                prev.map((u) => (u.id === uid ? { ...u, progress: pct } : u)),
              );
            },
          );
          const result = await actor.uploadFile(
            file.name,
            file.type || "application/octet-stream",
            BigInt(file.size),
            blob,
          );
          if (result.__kind__ === "err") throw new Error(result.err);
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === uid ? { ...u, status: "done", progress: 100 } : u,
            ),
          );
          toast.success(`Uploaded ${file.name}`);
          qc.invalidateQueries({ queryKey: ["files"] });
          qc.invalidateQueries({ queryKey: ["storageStats"] });
        } catch (e) {
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === uid
                ? { ...u, status: "error", errorMessage: (e as Error).message }
                : u,
            ),
          );
          toast.error(`Failed to upload ${file.name}`);
        }
      }

      // Auto-clear done uploads after 3s
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((u) => u.status !== "done"));
      }, 3000);
    },
    [actor, onUploadClose, qc],
  );

  const handleDownload = async (file: FileMetadata) => {
    const fileUrl = `https://storage.ic0.app/${file.id}`;
    try {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = file.name;
      a.click();
    } catch {
      toast.error("Download failed");
    }
  };

  const totalCount = data?.totalCount ?? 0n;
  const totalPages =
    totalCount > 0n ? (totalCount + PAGE_SIZE - 1n) / PAGE_SIZE : 1n;
  const files = data?.files ?? [];

  const activeUploads = uploadingFiles.filter((u) => u.status === "uploading");

  return (
    <div className="flex flex-col min-h-full">
      {/* Upload progress toast area */}
      {activeUploads.length > 0 && (
        <div
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72"
          data-ocid="upload-progress"
        >
          {activeUploads.map((u) => (
            <div
              key={u.id}
              className="bg-card border border-border rounded-lg shadow-md p-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-foreground truncate max-w-[180px]">
                  {u.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {u.progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-200"
                  style={{ width: `${u.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-border bg-background sticky top-0 z-10">
        <h1 className="font-display font-semibold text-lg text-foreground">
          {getCategoryLabel(activeCategory)}
        </h1>
        <div className="flex items-center gap-2 flex-1 max-w-xs ml-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-8 h-8 text-sm"
              placeholder="Search files…"
              value={search}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              data-ocid="search-input"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* File grid */}
      <div className="flex-1 px-4 md:px-6 py-4">
        {isError && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="error-state"
          >
            <FileWarning className="w-10 h-10 text-destructive mb-3" />
            <p className="font-medium text-foreground">Failed to load files</p>
            <p className="text-sm text-muted-foreground mt-1">
              Please try refreshing the page.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              "sk-1",
              "sk-2",
              "sk-3",
              "sk-4",
              "sk-5",
              "sk-6",
              "sk-7",
              "sk-8",
            ].map((k) => (
              <div
                key={k}
                className="rounded-xl border border-border overflow-hidden"
              >
                <Skeleton className="h-28 w-full rounded-none" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isError && files.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="empty-state"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <CloudUpload className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg mb-1">
              {search ? "No files match your search" : "No files yet"}
            </p>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">
              {search
                ? "Try a different search term or clear the filter."
                : "Upload photos, videos, documents, or audio files to get started."}
            </p>
            {!search && (
              <Button
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="empty-upload-btn"
              >
                <Upload className="w-4 h-4" />
                Upload your first file
              </Button>
            )}
          </div>
        )}

        {!isLoading && !isError && files.length > 0 && (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            data-ocid="files-grid"
          >
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDelete={() => setDeleteTarget(file)}
                onRename={() => {
                  setRenameTarget(file);
                  setRenameValue(file.name);
                }}
                onDownload={() => handleDownload(file)}
                onOpen={() => onFileClick?.(file.id)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1n && (
          <div
            className="flex items-center justify-center gap-2 mt-8"
            data-ocid="pagination"
          >
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1n}
              onClick={() => onPageChange((p) => p - 1n)}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Number(totalPages) }, (_, i) => {
                const p = BigInt(i + 1);
                if (
                  p === 1n ||
                  p === totalPages ||
                  (p >= page - 1n && p <= page + 1n)
                ) {
                  return (
                    <button
                      key={`page-${i + 1}`}
                      type="button"
                      onClick={() => onPageChange(p)}
                      className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                        p === page
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                if (p === page - 2n || p === page + 2n) {
                  return (
                    <span
                      key={`ellipsis-${p.toString()}`}
                      className="text-muted-foreground px-1"
                    >
                      …
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange((p) => p + 1n)}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt"
        className="sr-only"
        onChange={(e) => handleFilePick(e.target.files)}
      />

      {/* Upload modal */}
      <Dialog open={uploadOpen} onOpenChange={(o) => !o && onUploadClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Select files from your device to upload to MediaVault.
            </DialogDescription>
          </DialogHeader>
          <button
            type="button"
            className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors group"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFilePick(e.dataTransfer.files);
            }}
            aria-label="Click or drop files to upload"
            data-ocid="upload-dropzone"
          >
            <CloudUpload className="w-10 h-10 text-muted-foreground group-hover:text-primary mx-auto mb-3 transition-colors" />
            <p className="font-medium text-foreground mb-1">Drop files here</p>
            <p className="text-sm text-muted-foreground mb-4">
              or tap to browse your device
            </p>
            <Badge variant="secondary" className="text-xs">
              Photos · Videos · Audio · Docs
            </Badge>
          </button>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={onUploadClose}>
              Cancel
            </Button>
            <Button
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="upload-browse-btn"
            >
              <Upload className="w-4 h-4" />
              Browse Files
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete file?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleteTarget?.name}" will be permanently deleted. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="delete-cancel-btn">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() =>
                deleteTarget && deleteMutation.mutate(deleteTarget.id)
              }
              data-ocid="delete-confirm-btn"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename modal */}
      <Dialog
        open={!!renameTarget}
        onOpenChange={(o) => !o && setRenameTarget(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Enter a new name for this file.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && renameTarget && renameValue.trim()) {
                renameMutation.mutate({
                  id: renameTarget.id,
                  name: renameValue.trim(),
                });
              }
            }}
            placeholder="File name"
            data-ocid="rename-input"
            autoFocus
          />
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Cancel
            </Button>
            <Button
              disabled={!renameValue.trim() || renameMutation.isPending}
              onClick={() =>
                renameTarget &&
                renameMutation.mutate({
                  id: renameTarget.id,
                  name: renameValue.trim(),
                })
              }
              data-ocid="rename-confirm-btn"
            >
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── FileCard ──────────────────────────────────────────────────────────────────

interface FileCardProps {
  file: FileMetadata;
  onDelete: () => void;
  onRename: () => void;
  onDownload: () => void;
  onOpen?: () => void;
}

function FileCard({
  file,
  onDelete,
  onRename,
  onDownload,
  onOpen,
}: FileCardProps) {
  const Icon = getFileIcon(file.mimeType, file.name);
  const showImage = isImageFile(file.mimeType, file.name);
  const showVideo = isVideoFile(file.mimeType, file.name);

  const categoryColor: Record<FileCategory, string> = {
    [FileCategory.image]: "bg-chart-3/10 text-chart-3",
    [FileCategory.video]: "bg-primary/10 text-primary",
    [FileCategory.audio]: "bg-chart-5/10 text-chart-5",
    [FileCategory.document_]: "bg-accent/10 text-accent",
  };

  return (
    <div
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-200"
      data-ocid="file-card"
    >
      {/* Clickable thumbnail area */}
      <button
        type="button"
        className="block w-full text-left focus-visible:outline-none"
        onClick={onOpen}
        aria-label={`Open ${file.name}`}
      >
        {/* Thumbnail */}
        <div className="relative h-28 bg-muted flex items-center justify-center overflow-hidden">
          {showImage ? (
            <img
              src={`https://storage.ic0.app/${file.id}`}
              alt={file.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : showVideo ? (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Icon className="w-8 h-8 text-muted-foreground" />
            </div>
          ) : (
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColor[file.category] ?? "bg-muted text-muted-foreground"}`}
            >
              <Icon className="w-6 h-6" />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </button>

      {/* Meta */}
      <div className="px-3 py-2.5">
        <div className="flex items-start justify-between gap-1">
          <button
            type="button"
            className="text-sm font-medium text-foreground truncate flex-1 min-w-0 text-left hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
            title={file.name}
            onClick={onOpen}
          >
            {file.name}
          </button>
          {/* Stop propagation on dropdown so card click doesn't fire */}
          <div
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="File options"
                  data-ocid="file-options-trigger"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onClick={onDownload}
                  data-ocid="file-download-option"
                >
                  <Download className="w-4 h-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onClick={onRename}
                  data-ocid="file-rename-option"
                >
                  <Pencil className="w-4 h-4" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                  onClick={onDelete}
                  data-ocid="file-delete-option"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formatDate(file.uploadedAt)} · {formatFileSize(file.fileSize)}
        </p>
      </div>
    </div>
  );
}
