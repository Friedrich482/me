import { type FieldValues, useForm } from "react-hook-form";
import { Trash2, TriangleAlert, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { Button } from "@repo/ui/components/ui/button";

const DeletePostAlert = <T extends FieldValues>({
  form,
  onDelete,
}: {
  form: ReturnType<typeof useForm<T>>;
  onDelete: (values: T) => Promise<void>;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={form.formState.isSubmitting}
          className="shadow-primary/50 h-11 w-32 rounded-lg shadow-lg"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel asChild className="place-self-end">
          <Button variant="outline" size="icon">
            <X />
          </Button>
        </AlertDialogCancel>
        <AlertDialogHeader className="flex flex-col gap-4">
          <AlertDialogTitle className="flex flex-col gap-3">
            <TriangleAlert className="text-destructive size-12" />
            You are about to delete the post
          </AlertDialogTitle>
          <AlertDialogDescription className="text-destructive text-lg">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="focus-visible">
            <X />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              disabled={form.formState.isSubmitting}
              onClick={form.handleSubmit(onDelete)}
            >
              <Trash2 />
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostAlert;
