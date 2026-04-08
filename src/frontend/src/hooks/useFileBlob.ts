import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { createActor } from "../backend";

export function useFileBlob(fileId: string | null, mimeType: string) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  // Track created blob URLs so we can revoke them on cleanup
  const blobUrlRef = useRef<string | null>(null);

  const query = useQuery<string | null>({
    queryKey: ["fileBlob", fileId],
    queryFn: async () => {
      if (!actor || !fileId) return null;

      const externalBlob = await actor.getFileBlob(fileId);
      if (!externalBlob) return null;

      const bytes = await externalBlob.getBytes();
      const blob = new Blob([bytes], { type: mimeType });
      const url = URL.createObjectURL(blob);
      blobUrlRef.current = url;
      return url;
    },
    enabled: !!actor && !actorFetching && !!fileId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Revoke the previous blob URL when the query produces a new one or the component unmounts
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  return {
    blobUrl: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
