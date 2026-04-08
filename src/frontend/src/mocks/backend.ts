import type { backendInterface, FileMetadata, StorageStats, ListFilesResponse, DeleteResult, UploadResult, RenameResult, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillResult, _ImmutableObjectStorageRefillInformation } from "../backend";
import { FileCategory, SortField, SortOrder } from "../backend";

const sampleFiles: FileMetadata[] = [
  {
    id: "file-1",
    name: "Mountain Landscape.jpg",
    mimeType: "image/jpeg",
    fileSize: BigInt(2097152),
    category: FileCategory.image,
    uploadedAt: BigInt(1620000000000000000),
  },
  {
    id: "file-2",
    name: "Documents Overview.pdf",
    mimeType: "application/pdf",
    fileSize: BigInt(23068672),
    category: FileCategory.document_,
    uploadedAt: BigInt(1620000000000000000),
  },
  {
    id: "file-3",
    name: "Mennik Portrait.jpg",
    mimeType: "image/jpeg",
    fileSize: BigInt(2097152),
    category: FileCategory.image,
    uploadedAt: BigInt(1621296000000000000),
  },
  {
    id: "file-4",
    name: "Video Intro.mp4",
    mimeType: "video/mp4",
    fileSize: BigInt(36700160),
    category: FileCategory.video,
    uploadedAt: BigInt(1620000000000000000),
  },
  {
    id: "file-5",
    name: "Photo Marker.jpg",
    mimeType: "image/jpeg",
    fileSize: BigInt(36700160),
    category: FileCategory.image,
    uploadedAt: BigInt(1620000000000000000),
  },
  {
    id: "file-6",
    name: "Project Notes.docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    fileSize: BigInt(36700160),
    category: FileCategory.document_,
    uploadedAt: BigInt(1620086400000000000),
  },
  {
    id: "file-7",
    name: "Landscape River.mp4",
    mimeType: "video/mp4",
    fileSize: BigInt(6291456),
    category: FileCategory.video,
    uploadedAt: BigInt(1620086400000000000),
  },
  {
    id: "file-8",
    name: "Desert Walk.png",
    mimeType: "image/png",
    fileSize: BigInt(10799923),
    category: FileCategory.image,
    uploadedAt: BigInt(1620086400000000000),
  },
  {
    id: "file-9",
    name: "Ambient Mix.mp3",
    mimeType: "audio/mpeg",
    fileSize: BigInt(3145728),
    category: FileCategory.audio,
    uploadedAt: BigInt(1620086400000000000),
  },
];

export const mockBackend: backendInterface = {
  listFiles: async (request) => {
    const page = Number(request.page);
    const pageSize = Number(request.pageSize);
    let filtered = sampleFiles;
    if (request.category !== undefined) {
      filtered = sampleFiles.filter((f) => f.category === request.category);
    }
    if (request.searchQuery) {
      const q = request.searchQuery.toLowerCase();
      filtered = filtered.filter((f) => f.name.toLowerCase().includes(q));
    }
    const start = page * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);
    const response: ListFilesResponse = {
      files: pageItems,
      page: BigInt(page),
      totalCount: BigInt(filtered.length),
      pageSize: BigInt(pageSize),
    };
    return response;
  },

  getStorageStats: async (): Promise<StorageStats> => ({
    totalFiles: BigInt(sampleFiles.length),
    videoCount: BigInt(2),
    imageCount: BigInt(4),
    totalBytes: BigInt(157286400),
    audioCount: BigInt(1),
    documentCount: BigInt(2),
  }),

  getFileMetadata: async (fileId: string): Promise<FileMetadata | null> => {
    return sampleFiles.find((f) => f.id === fileId) ?? null;
  },

  deleteFile: async (_fileId: string): Promise<DeleteResult> => ({
    __kind__: "ok",
    ok: null,
  }),

  uploadFile: async (name, mimeType, fileSize, _blob): Promise<UploadResult> => ({
    __kind__: "ok",
    ok: {
      id: "new-file-" + Date.now(),
      name,
      mimeType,
      fileSize,
      category: FileCategory.image,
      uploadedAt: BigInt(Date.now()) * BigInt(1000000),
    },
  }),

  renameFile: async (fileId: string, newName: string): Promise<RenameResult> => {
    const file = sampleFiles.find((f) => f.id === fileId);
    if (!file) return { __kind__: "err", err: "File not found" };
    return { __kind__: "ok", ok: { ...file, name: newName } };
  },

  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>): Promise<Array<boolean>> => [],
  _immutableObjectStorageBlobsToDelete: async (): Promise<Array<Uint8Array>> => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>): Promise<void> => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_refillInformation: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async (): Promise<void> => undefined,
};
