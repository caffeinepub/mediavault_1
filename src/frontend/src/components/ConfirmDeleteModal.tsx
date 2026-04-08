import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  fileName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  open,
  fileName,
  isDeleting,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <AlertDialogContent
        className="max-w-sm mx-4"
        data-ocid="confirm-delete-modal"
      >
        <AlertDialogHeader>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-2">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <AlertDialogTitle className="text-center font-display">
            Delete file?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <span className="font-medium text-foreground">{fileName}</span> will
            be permanently deleted. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isDeleting}
            data-ocid="confirm-delete-cancel"
            className="w-full sm:w-auto"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            data-ocid="confirm-delete-confirm"
            className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
