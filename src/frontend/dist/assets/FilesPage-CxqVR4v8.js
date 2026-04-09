import { c as createLucideIcon, j as jsxRuntimeExports, R as Root, C as Content, a as Close, X, b as cn, T as Title, D as Description, P as Portal, O as Overlay, u as useActor, d as useQueryClient, r as reactExports, S as SortOrder, e as SortField, f as useQuery, g as useMutation, E as ExternalBlob, h as ue, i as getCategoryLabel, I as Input, k as Skeleton, B as Button, U as Upload, l as Badge, A as AlertDialog, m as AlertDialogContent, n as AlertDialogHeader, o as AlertDialogTitle, p as AlertDialogDescription, q as AlertDialogFooter, s as AlertDialogCancel, t as AlertDialogAction, v as getFileIcon, w as isImageFile, x as isVideoFile, y as useFileBlob, F as FileCategory, z as DropdownMenu, G as DropdownMenuTrigger, H as DropdownMenuContent, J as DropdownMenuItem, K as Download, L as Pencil, M as DropdownMenuSeparator, N as Trash2, Q as formatDate, V as formatFileSize, W as createActor } from "./index-CoVRp3BH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
];
const EllipsisVertical = createLucideIcon("ellipsis-vertical", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const FileWarning = createLucideIcon("file-warning", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const PAGE_SIZE = 12n;
function FilesPage({
  activeCategory,
  uploadOpen,
  onUploadClose,
  onFileClick,
  search,
  onSearchChange,
  page,
  onPageChange
}) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const qc = useQueryClient();
  const [uploadingFiles, setUploadingFiles] = reactExports.useState([]);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [renameTarget, setRenameTarget] = reactExports.useState(null);
  const [renameValue, setRenameValue] = reactExports.useState("");
  const fileInputRef = reactExports.useRef(null);
  const request = {
    page: page - 1n,
    pageSize: PAGE_SIZE,
    sortField: SortField.uploadDate,
    sortOrder: SortOrder.desc,
    category: activeCategory ?? void 0,
    searchQuery: search.trim() || void 0
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["files", activeCategory, search, page.toString()],
    queryFn: async () => {
      if (!actor)
        return { files: [], totalCount: 0n, page: 0n, pageSize: PAGE_SIZE };
      return actor.listFiles(request);
    },
    enabled: !!actor && !actorFetching,
    placeholderData: (prev) => prev
  });
  const deleteMutation = useMutation({
    mutationFn: async (fileId) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.deleteFile(fileId);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      ue.success("File deleted");
      setDeleteTarget(null);
      qc.invalidateQueries({ queryKey: ["files"] });
      qc.invalidateQueries({ queryKey: ["storageStats"] });
    },
    onError: (e) => ue.error(`Delete failed: ${e.message}`)
  });
  const renameMutation = useMutation({
    mutationFn: async ({ id, name }) => {
      if (!actor) throw new Error("No actor");
      const result = await actor.renameFile(id, name);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      ue.success("File renamed");
      setRenameTarget(null);
      qc.invalidateQueries({ queryKey: ["files"] });
    },
    onError: (e) => ue.error(`Rename failed: ${e.message}`)
  });
  const handleFilePick = reactExports.useCallback(
    async (files2) => {
      var _a;
      if (!files2 || !actor) return;
      const newUploads = Array.from(files2).map((f) => ({
        id: `${f.name}-${Date.now()}`,
        name: f.name,
        progress: 0,
        status: "uploading",
        mimeType: f.type || "application/octet-stream",
        fileSize: f.size
      }));
      setUploadingFiles((prev) => [...prev, ...newUploads]);
      onUploadClose();
      for (const file of Array.from(files2)) {
        const uid = (_a = newUploads.find((u) => u.name === file.name)) == null ? void 0 : _a.id;
        if (!uid) continue;
        try {
          const bytes = new Uint8Array(await file.arrayBuffer());
          const blob = ExternalBlob.fromBytes(bytes).withUploadProgress(
            (pct) => {
              setUploadingFiles(
                (prev) => prev.map((u) => u.id === uid ? { ...u, progress: pct } : u)
              );
            }
          );
          const result = await actor.uploadFile(
            file.name,
            file.type || "application/octet-stream",
            BigInt(file.size),
            blob
          );
          if (result.__kind__ === "err") throw new Error(result.err);
          setUploadingFiles(
            (prev) => prev.map(
              (u) => u.id === uid ? { ...u, status: "done", progress: 100 } : u
            )
          );
          ue.success(`Uploaded ${file.name}`);
          qc.invalidateQueries({ queryKey: ["files"] });
          qc.invalidateQueries({ queryKey: ["storageStats"] });
        } catch (e) {
          setUploadingFiles(
            (prev) => prev.map(
              (u) => u.id === uid ? { ...u, status: "error", errorMessage: e.message } : u
            )
          );
          ue.error(`Failed to upload ${file.name}`);
        }
      }
      setTimeout(() => {
        setUploadingFiles((prev) => prev.filter((u) => u.status !== "done"));
      }, 3e3);
    },
    [actor, onUploadClose, qc]
  );
  const handleDownload = async (file) => {
    const fileUrl = `https://storage.ic0.app/${file.id}`;
    try {
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = file.name;
      a.click();
    } catch {
      ue.error("Download failed");
    }
  };
  const totalCount = (data == null ? void 0 : data.totalCount) ?? 0n;
  const totalPages = totalCount > 0n ? (totalCount + PAGE_SIZE - 1n) / PAGE_SIZE : 1n;
  const files = (data == null ? void 0 : data.files) ?? [];
  const activeUploads = uploadingFiles.filter((u) => u.status === "uploading");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    activeUploads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-72",
        "data-ocid": "upload-progress",
        children: activeUploads.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg shadow-md p-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate max-w-[180px]", children: u.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  u.progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-accent rounded-full transition-all duration-200",
                  style: { width: `${u.progress}%` }
                }
              ) })
            ]
          },
          u.id
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-border bg-background sticky top-0 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-lg text-foreground", children: getCategoryLabel(activeCategory) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 flex-1 max-w-xs ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-8 h-8 text-sm",
            placeholder: "Search files…",
            value: search,
            onChange: (e) => {
              onSearchChange(e.target.value);
            },
            "data-ocid": "search-input"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onSearchChange(""),
            className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-4 md:px-6 py-4", children: [
      isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "error-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileWarning, { className: "w-10 h-10 text-destructive mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Failed to load files" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Please try refreshing the page." })
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4", children: [
        "sk-1",
        "sk-2",
        "sk-3",
        "sk-4",
        "sk-5",
        "sk-6",
        "sk-7",
        "sk-8"
      ].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
            ] })
          ]
        },
        k
      )) }),
      !isLoading && !isError && files.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 text-center",
          "data-ocid": "empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg mb-1", children: search ? "No files match your search" : "No files yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5 max-w-xs", children: search ? "Try a different search term or clear the filter." : "Upload photos, videos, documents, or audio files to get started." }),
            !search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
                onClick: () => {
                  var _a;
                  return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                },
                "data-ocid": "empty-upload-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
                  "Upload your first file"
                ]
              }
            )
          ]
        }
      ),
      !isLoading && !isError && files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4",
          "data-ocid": "files-grid",
          children: files.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileCard,
            {
              file,
              onDelete: () => setDeleteTarget(file),
              onRename: () => {
                setRenameTarget(file);
                setRenameValue(file.name);
              },
              onDownload: () => handleDownload(file),
              onOpen: () => onFileClick == null ? void 0 : onFileClick(file.id)
            },
            file.id
          ))
        }
      ),
      totalPages > 1n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-center gap-2 mt-8",
          "data-ocid": "pagination",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page <= 1n,
                onClick: () => onPageChange((p) => p - 1n),
                "aria-label": "Previous page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: Number(totalPages) }, (_, i) => {
              const p = BigInt(i + 1);
              if (p === 1n || p === totalPages || p >= page - 1n && p <= page + 1n) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onPageChange(p),
                    className: `w-8 h-8 rounded-md text-sm font-medium transition-colors ${p === page ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`,
                    children: i + 1
                  },
                  `page-${i + 1}`
                );
              }
              if (p === page - 2n || p === page + 2n) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-muted-foreground px-1",
                    children: "…"
                  },
                  `ellipsis-${p.toString()}`
                );
              }
              return null;
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                disabled: page >= totalPages,
                onClick: () => onPageChange((p) => p + 1n),
                "aria-label": "Next page",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        accept: "image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt",
        className: "sr-only",
        onChange: (e) => handleFilePick(e.target.files)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: uploadOpen, onOpenChange: (o) => !o && onUploadClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Upload Files" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Select files from your device to upload to MediaVault." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "w-full border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors group",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          onDragOver: (e) => e.preventDefault(),
          onDrop: (e) => {
            e.preventDefault();
            handleFilePick(e.dataTransfer.files);
          },
          "aria-label": "Click or drop files to upload",
          "data-ocid": "upload-dropzone",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-10 h-10 text-muted-foreground group-hover:text-primary mx-auto mb-3 transition-colors" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "Drop files here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "or tap to browse your device" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: "Photos · Videos · Audio · Docs" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onUploadClose, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            "data-ocid": "upload-browse-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4" }),
              "Browse Files"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deleteTarget,
        onOpenChange: (o) => !o && setDeleteTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete file?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              '"',
              deleteTarget == null ? void 0 : deleteTarget.name,
              '" will be permanently deleted. This action cannot be undone.'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "delete-cancel-btn", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: () => deleteTarget && deleteMutation.mutate(deleteTarget.id),
                "data-ocid": "delete-confirm-btn",
                children: "Delete"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!renameTarget,
        onOpenChange: (o) => !o && setRenameTarget(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Rename File" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Enter a new name for this file." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: renameValue,
              onChange: (e) => setRenameValue(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && renameTarget && renameValue.trim()) {
                  renameMutation.mutate({
                    id: renameTarget.id,
                    name: renameValue.trim()
                  });
                }
              },
              placeholder: "File name",
              "data-ocid": "rename-input",
              autoFocus: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setRenameTarget(null), children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                disabled: !renameValue.trim() || renameMutation.isPending,
                onClick: () => renameTarget && renameMutation.mutate({
                  id: renameTarget.id,
                  name: renameValue.trim()
                }),
                "data-ocid": "rename-confirm-btn",
                children: "Rename"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function FileCard({
  file,
  onDelete,
  onRename,
  onDownload,
  onOpen
}) {
  const Icon = getFileIcon(file.mimeType, file.name);
  const showImage = isImageFile(file.mimeType, file.name);
  const showVideo = isVideoFile(file.mimeType, file.name);
  const { blobUrl: thumbnailUrl, isLoading: thumbLoading } = useFileBlob(
    showImage ? file.id : null,
    file.mimeType
  );
  const categoryColor = {
    [FileCategory.image]: "bg-chart-3/10 text-chart-3",
    [FileCategory.video]: "bg-primary/10 text-primary",
    [FileCategory.audio]: "bg-chart-5/10 text-chart-5",
    [FileCategory.document_]: "bg-accent/10 text-accent"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-200",
      "data-ocid": "file-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "block w-full text-left focus-visible:outline-none",
            onClick: onOpen,
            "aria-label": `Open ${file.name}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-28 bg-muted flex items-center justify-center overflow-hidden", children: [
              showImage ? thumbLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-full absolute inset-0 rounded-none" }) : thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: thumbnailUrl,
                  alt: file.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center ${categoryColor[file.category] ?? "bg-muted text-muted-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
                }
              ) : showVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-8 h-8 text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-12 h-12 rounded-xl flex items-center justify-center ${categoryColor[file.category] ?? "bg-muted text-muted-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-6 h-6" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-sm font-medium text-foreground truncate flex-1 min-w-0 text-left hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline",
                title: file.name,
                onClick: onOpen,
                children: file.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                onClick: (e) => e.stopPropagation(),
                onKeyDown: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                      "aria-label": "File options",
                      "data-ocid": "file-options-trigger",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-3.5 h-3.5" })
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuItem,
                      {
                        className: "gap-2 cursor-pointer",
                        onClick: onDownload,
                        "data-ocid": "file-download-option",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
                          "Download"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuItem,
                      {
                        className: "gap-2 cursor-pointer",
                        onClick: onRename,
                        "data-ocid": "file-rename-option",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }),
                          "Rename"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      DropdownMenuItem,
                      {
                        className: "gap-2 cursor-pointer text-destructive focus:text-destructive",
                        onClick: onDelete,
                        "data-ocid": "file-delete-option",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" }),
                          "Delete"
                        ]
                      }
                    )
                  ] })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            formatDate(file.uploadedAt),
            " · ",
            formatFileSize(file.fileSize)
          ] })
        ] })
      ]
    }
  );
}
export {
  FilesPage
};
