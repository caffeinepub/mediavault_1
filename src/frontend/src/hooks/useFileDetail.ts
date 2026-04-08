import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { FileMetadata } from "../types";

export function useFileMetadata(fileId: string | null) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<FileMetadata | null>({
    queryKey: ["fileMetadata", fileId],
    queryFn: async () => {
      if (!actor || !fileId) return null;
      return actor.getFileMetadata(fileId);
    },
    enabled: !!actor && !actorFetching && !!fileId,
  });
}

export function useDeleteFile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileId: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.deleteFile(fileId);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.invalidateQueries({ queryKey: ["storageStats"] });
    },
  });
}

export function useRenameFile() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileId,
      newName,
    }: {
      fileId: string;
      newName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.renameFile(fileId, newName);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      queryClient.setQueryData(["fileMetadata", data.id], data);
    },
  });
}
