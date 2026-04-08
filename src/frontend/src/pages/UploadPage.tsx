import { Layout } from "../components/Layout";
import { UploadDropzone } from "../components/UploadDropzone";
import { useCurrentUser } from "../hooks/useCurrentUser";

export function UploadPage() {
  const { isAuthenticated } = useCurrentUser();

  if (!isAuthenticated) return null;

  return (
    <Layout
      activeCategory={null}
      onCategoryChange={() => {}}
      onUploadClick={() => {}}
    >
      <div className="flex-1 flex flex-col h-full max-w-lg mx-auto w-full pt-4 pb-8">
        <UploadDropzone />
      </div>
    </Layout>
  );
}
