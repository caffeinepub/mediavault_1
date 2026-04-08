import {
  File,
  FileText,
  Image,
  type LucideIcon,
  Music,
  Video,
} from "lucide-react";
import { FileCategory } from "../types";

export function formatFileSize(bytes: bigint | number): string {
  const n = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (n === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  const value = n / 1024 ** i;
  return `${value % 1 === 0 ? value : value.toFixed(1)} ${units[i]}`;
}

export function formatDate(timestamp: bigint | number): string {
  // Backend timestamps are in nanoseconds
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp / 1_000_000n) : timestamp;
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getCategoryLabel(category: FileCategory | null): string {
  switch (category) {
    case FileCategory.document_:
      return "Documents";
    case FileCategory.image:
      return "Images";
    case FileCategory.video:
      return "Videos";
    case FileCategory.audio:
      return "Audio";
    default:
      return "All Files";
  }
}

export function getFileIcon(mimeType: string, fileName: string): LucideIcon {
  const mime = mimeType.toLowerCase();
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (
    mime.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext)
  ) {
    return Image;
  }
  if (
    mime.startsWith("video/") ||
    ["mp4", "mov", "avi", "mkv", "webm"].includes(ext)
  ) {
    return Video;
  }
  if (
    mime.startsWith("audio/") ||
    ["mp3", "wav", "aac", "flac", "ogg"].includes(ext)
  ) {
    return Music;
  }
  if (
    mime.includes("pdf") ||
    mime.includes("word") ||
    mime.includes("document") ||
    mime.includes("text") ||
    [
      "pdf",
      "doc",
      "docx",
      "txt",
      "rtf",
      "odt",
      "xls",
      "xlsx",
      "ppt",
      "pptx",
    ].includes(ext)
  ) {
    return FileText;
  }
  return File;
}

export function isImageFile(mimeType: string, fileName: string): boolean {
  const mime = mimeType.toLowerCase();
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return (
    mime.startsWith("image/") ||
    ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(ext)
  );
}

export function isVideoFile(mimeType: string, fileName: string): boolean {
  const mime = mimeType.toLowerCase();
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return (
    mime.startsWith("video/") ||
    ["mp4", "mov", "avi", "mkv", "webm"].includes(ext)
  );
}

// Max storage: 1 GB for display purposes
export const MAX_STORAGE_BYTES = 1_073_741_824n;

export function getStoragePercentage(usedBytes: bigint): number {
  const used = Number(usedBytes);
  const max = Number(MAX_STORAGE_BYTES);
  return Math.min(100, Math.round((used / max) * 100));
}
