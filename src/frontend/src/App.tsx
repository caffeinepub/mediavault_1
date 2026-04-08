import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, lazy, useState } from "react";
import { Layout } from "./components/Layout";
import { LoginScreen } from "./components/LoginScreen";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { FileDetailPage } from "./pages/FileDetailPage";
import type { FileCategory, FileId } from "./types";

const FilesPage = lazy(() =>
  import("./pages/FilesPage").then((m) => ({ default: m.FilesPage })),
);

const SKELETON_KEYS = [
  "sk-a",
  "sk-b",
  "sk-c",
  "sk-d",
  "sk-e",
  "sk-f",
  "sk-g",
  "sk-h",
];
const BOUNCE_KEYS = ["dot-a", "dot-b", "dot-c"];

function PageSkeleton() {
  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="rounded-lg border border-border overflow-hidden"
        >
          <Skeleton className="h-32 w-full rounded-none" />
          <div className="p-3 space-y-1.5">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const { isAuthenticated, isLoading, login } = useCurrentUser();
  const [activeCategory, setActiveCategory] = useState<FileCategory | null>(
    null,
  );
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<FileId | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1n);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg font-display">
              M
            </span>
          </div>
          <div className="flex gap-1">
            {BOUNCE_KEYS.map((key, i) => (
              <div
                key={key}
                className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  if (selectedFileId) {
    return (
      <FileDetailPage
        fileId={selectedFileId}
        onBack={() => setSelectedFileId(null)}
      />
    );
  }

  return (
    <Layout
      activeCategory={activeCategory}
      onCategoryChange={(cat) => {
        setActiveCategory(cat);
        setPage(1n);
      }}
      onUploadClick={() => setUploadOpen(true)}
    >
      <Suspense fallback={<PageSkeleton />}>
        <FilesPage
          activeCategory={activeCategory}
          uploadOpen={uploadOpen}
          onUploadClose={() => setUploadOpen(false)}
          onFileClick={(id) => setSelectedFileId(id)}
          search={search}
          onSearchChange={(s) => {
            setSearch(s);
            setPage(1n);
          }}
          page={page}
          onPageChange={setPage}
        />
      </Suspense>
    </Layout>
  );
}
