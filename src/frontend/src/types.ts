// Re-export backend types for use across the frontend
export type {
  FileMetadata,
  FileId,
  ListFilesRequest,
  ListFilesResponse,
  StorageStats,
  UploadResult,
  DeleteResult,
  RenameResult,
} from "./backend";

export { FileCategory, SortField, SortOrder } from "./backend";

// UI-only types
export type UploadingFile = {
  id: string;
  name: string;
  progress: number;
  status: "uploading" | "done" | "error";
  mimeType: string;
  fileSize: number;
  errorMessage?: string;
};
