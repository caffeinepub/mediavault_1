import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { StorageStats } from "../types";

export function useStorageStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<StorageStats>({
    queryKey: ["storageStats"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalFiles: 0n,
          totalBytes: 0n,
          documentCount: 0n,
          imageCount: 0n,
          videoCount: 0n,
          audioCount: 0n,
        };
      }
      return actor.getStorageStats();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30_000,
  });
}
