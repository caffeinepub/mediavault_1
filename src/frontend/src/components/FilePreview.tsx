import {
  FileText,
  Headphones,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useFileBlob } from "../hooks/useFileBlob";
import { isImageFile, isVideoFile } from "../utils/fileUtils";

function isAudioFile(mimeType: string, fileName: string): boolean {
  const mime = mimeType.toLowerCase();
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return (
    mime.startsWith("audio/") ||
    ["mp3", "wav", "aac", "flac", "ogg", "m4a"].includes(ext)
  );
}

interface FilePreviewProps {
  fileId: string;
  mimeType: string;
  fileName: string;
  className?: string;
}

export function FilePreview({
  fileId,
  mimeType,
  fileName,
  className = "",
}: FilePreviewProps) {
  const { blobUrl, isLoading } = useFileBlob(fileId, mimeType);

  if (isImageFile(mimeType, fileName)) {
    return (
      <div
        className={`relative flex items-center justify-center bg-muted/40 rounded-lg ${className}`}
        data-ocid="file-preview-image"
      >
        {isLoading || !blobUrl ? (
          <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <img
            src={blobUrl}
            alt={fileName}
            className="w-full h-auto object-contain rounded-lg touch-manipulation select-none"
            style={{ touchAction: "pinch-zoom" }}
            draggable={false}
          />
        )}
      </div>
    );
  }

  if (isVideoFile(mimeType, fileName)) {
    return (
      <div
        className={`relative flex items-center justify-center bg-muted/60 rounded-lg ${className}`}
        data-ocid="file-preview-video"
      >
        {isLoading || !blobUrl ? (
          <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
          </div>
        ) : (
          // biome-ignore lint/a11y/useMediaCaption: user-uploaded video files may not have captions
          <video
            src={blobUrl}
            controls
            playsInline
            className="max-w-full max-h-full rounded-lg"
          />
        )}
      </div>
    );
  }

  if (isAudioFile(mimeType, fileName)) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-6 bg-muted/40 rounded-lg ${className}`}
        data-ocid="file-preview-audio"
      >
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Headphones className="w-10 h-10 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground truncate max-w-[80%] text-center">
          {fileName}
        </p>
        {isLoading ? (
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        ) : blobUrl ? (
          // biome-ignore lint/a11y/useMediaCaption: user-uploaded audio files
          <audio src={blobUrl} controls className="w-full max-w-xs" />
        ) : null}
      </div>
    );
  }

  // PDF check
  const isPdf =
    mimeType.includes("pdf") || fileName.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-muted/40 rounded-lg ${className}`}
        data-ocid="file-preview-pdf"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <FileText className="w-9 h-9 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground">PDF Document</p>
        {isLoading ? (
          <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
        ) : blobUrl ? (
          <a
            href={blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            download={fileName}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            data-ocid="file-preview-download"
          >
            Open PDF
          </a>
        ) : null}
      </div>
    );
  }

  // Generic document / unknown
  const isDoc =
    mimeType.includes("word") ||
    mimeType.includes("document") ||
    mimeType.includes("text") ||
    mimeType.includes("spreadsheet") ||
    mimeType.includes("presentation");

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-muted/40 rounded-lg ${className}`}
      data-ocid="file-preview-document"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
        {isDoc ? (
          <FileText className="w-9 h-9 text-primary" />
        ) : (
          <ImageIcon className="w-9 h-9 text-primary" />
        )}
      </div>
      <p className="text-sm text-muted-foreground capitalize">
        {isDoc ? "Document" : "File"}
      </p>
      {isLoading ? (
        <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
      ) : blobUrl ? (
        <a
          href={blobUrl}
          download={fileName}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          data-ocid="file-preview-download-generic"
        >
          Download file
        </a>
      ) : null}
    </div>
  );
}
