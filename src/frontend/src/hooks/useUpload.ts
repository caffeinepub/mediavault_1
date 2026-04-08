import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { ExternalBlob, createActor } from "../backend";
import type { UploadResult } from "../types";
import type { UploadingFile } from "../types";

const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/webm",
  "audio/mpeg",
  "audio/wav",
  "audio/aac",
  "audio/flac",
  "audio/ogg",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/csv",
  "application/rtf",
];

const ACCEPTED_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "mp4",
  "mov",
  "avi",
  "mkv",
  "webm",
  "mp3",
  "wav",
  "aac",
  "flac",
  "ogg",
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "rtf",
  "csv",
  "odt",
];

// 500 MB max
export const MAX_FILE_SIZE = 500 * 1024 * 1024;

export function isFileAccepted(file: File): boolean {
  const mime = file.type.toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return (
    ACCEPTED_MIME_TYPES.includes(mime) || ACCEPTED_EXTENSIONS.includes(ext)
  );
}

export function useUpload() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [queue, setQueue] = useState<UploadingFile[]>([]);
  const abortControllers = useRef<Map<string, AbortController>>(new Map());

  const updateItem = useCallback(
    (id: string, patch: Partial<UploadingFile>) => {
      setQueue((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      );
    },
    [],
  );

  const removeItem = useCallback((id: string) => {
    abortControllers.current.delete(id);
    setQueue((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const uploadFile = useCallback(
    async (file: File, uploadId: string) => {
      if (!actor) {
        updateItem(uploadId, {
          status: "error",
          errorMessage: "Not connected. Please try again.",
        });
        return;
      }

      const abortController = new AbortController();
      abortControllers.current.set(uploadId, abortController);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);

        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
          (percentage: number) => {
            if (abortController.signal.aborted) return;
            updateItem(uploadId, { progress: Math.round(percentage) });
          },
        );

        const result: UploadResult = await actor.uploadFile(
          file.name,
          file.type || "application/octet-stream",
          BigInt(file.size),
          blob,
        );

        if (abortController.signal.aborted) return;

        if (result.__kind__ === "ok") {
          updateItem(uploadId, { status: "done", progress: 100 });
          queryClient.invalidateQueries({ queryKey: ["files"] });
          queryClient.invalidateQueries({ queryKey: ["storageStats"] });
        } else {
          updateItem(uploadId, {
            status: "error",
            errorMessage: result.err || "Upload failed",
          });
        }
      } catch (err) {
        if (abortController.signal.aborted) return;
        const msg =
          err instanceof Error ? err.message : "Upload failed unexpectedly";
        updateItem(uploadId, { status: "error", errorMessage: msg });
      } finally {
        abortControllers.current.delete(uploadId);
      }
    },
    [actor, queryClient, updateItem],
  );

  const enqueue = useCallback(
    (files: File[]) => {
      const newItems: UploadingFile[] = [];
      const validFiles: Array<{ file: File; id: string }> = [];

      for (const file of files) {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        if (!isFileAccepted(file)) {
          newItems.push({
            id,
            name: file.name,
            progress: 0,
            status: "error",
            mimeType: file.type,
            fileSize: file.size,
            errorMessage: "Unsupported file format",
          });
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          newItems.push({
            id,
            name: file.name,
            progress: 0,
            status: "error",
            mimeType: file.type,
            fileSize: file.size,
            errorMessage: "File exceeds 500 MB limit",
          });
          continue;
        }

        newItems.push({
          id,
          name: file.name,
          progress: 0,
          status: "uploading",
          mimeType: file.type,
          fileSize: file.size,
        });
        validFiles.push({ file, id });
      }

      setQueue((prev) => [...prev, ...newItems]);

      for (const { file, id } of validFiles) {
        uploadFile(file, id);
      }
    },
    [uploadFile],
  );

  const cancel = useCallback(
    (id: string) => {
      const ctrl = abortControllers.current.get(id);
      if (ctrl) ctrl.abort();
      removeItem(id);
    },
    [removeItem],
  );

  const dismiss = useCallback(
    (id: string) => {
      removeItem(id);
    },
    [removeItem],
  );

  const clearCompleted = useCallback(() => {
    setQueue((prev) => prev.filter((item) => item.status === "uploading"));
  }, []);

  const pendingCount = queue.filter((i) => i.status === "uploading").length;
  const hasItems = queue.length > 0;

  return {
    queue,
    enqueue,
    cancel,
    dismiss,
    clearCompleted,
    pendingCount,
    hasItems,
  };
}
