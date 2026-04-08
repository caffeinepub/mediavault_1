import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type RenameResult = {
    __kind__: "ok";
    ok: FileMetadata;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export interface FileMetadata {
    id: FileId;
    name: string;
    mimeType: string;
    fileSize: bigint;
    category: FileCategory;
    uploadedAt: Timestamp;
}
export type DeleteResult = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type UploadResult = {
    __kind__: "ok";
    ok: FileMetadata;
} | {
    __kind__: "err";
    err: string;
};
export interface ListFilesRequest {
    sortField: SortField;
    sortOrder: SortOrder;
    page: bigint;
    pageSize: bigint;
    category?: FileCategory;
    searchQuery?: string;
}
export interface ListFilesResponse {
    files: Array<FileMetadata>;
    page: bigint;
    totalCount: bigint;
    pageSize: bigint;
}
export type FileId = string;
export interface StorageStats {
    totalFiles: bigint;
    videoCount: bigint;
    imageCount: bigint;
    totalBytes: bigint;
    audioCount: bigint;
    documentCount: bigint;
}
export enum FileCategory {
    audio = "audio",
    video = "video",
    document_ = "document",
    image = "image"
}
export enum SortField {
    name = "name",
    fileSize = "fileSize",
    uploadDate = "uploadDate"
}
export enum SortOrder {
    asc = "asc",
    desc = "desc"
}
export interface backendInterface {
    deleteFile(fileId: FileId): Promise<DeleteResult>;
    getFileBlob(fileId: FileId): Promise<ExternalBlob | null>;
    getFileMetadata(fileId: FileId): Promise<FileMetadata | null>;
    getStorageStats(): Promise<StorageStats>;
    listFiles(request: ListFilesRequest): Promise<ListFilesResponse>;
    renameFile(fileId: FileId, newName: string): Promise<RenameResult>;
    uploadFile(name: string, mimeType: string, fileSize: bigint, blob: ExternalBlob): Promise<UploadResult>;
}
