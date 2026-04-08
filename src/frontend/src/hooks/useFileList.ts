import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { FileMetadata, ListFilesResponse } from "../types";
import type { FileCategory, SortField, SortOrder } from "../types";

export interface FileListParams {
  category: FileCategory | null;
  searchQuery: string;
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize?: number;
}

export function useFileList(params: FileListParams) {
  const { actor, isFetching } = useActor(createActor);
  const pageSize = params.pageSize ?? 20;

  return useQuery<ListFilesResponse>({
    queryKey: [
      "files",
      params.category,
      params.searchQuery,
      params.sortField,
      params.sortOrder,
      params.page,
      pageSize,
    ],
    queryFn: async () => {
      if (!actor) {
        return {
          files: [] as FileMetadata[],
          page: BigInt(params.page),
          totalCount: 0n,
          pageSize: BigInt(pageSize),
        };
      }
      return actor.listFiles({
        sortField: params.sortField,
        sortOrder: params.sortOrder,
        page: BigInt(params.page),
        pageSize: BigInt(pageSize),
        ...(params.category != null ? { category: params.category } : {}),
        ...(params.searchQuery.trim()
          ? { searchQuery: params.searchQuery.trim() }
          : {}),
      });
    },
    enabled: !!actor && !isFetching,
    placeholderData: (prev) => prev,
  });
}

export type { FileCategory, SortField, SortOrder };
