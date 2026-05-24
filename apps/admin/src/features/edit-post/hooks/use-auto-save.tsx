import { useEffect } from "react";

import { useViewModeStore } from "@/stores/view-mode-store";

export const useAutoSave = (
  saveChanges: (options?: { loading: string; success: string }) => void,
) => {
  const viewMode = useViewModeStore((state) => state.viewMode);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (viewMode === "preview") {
        return;
      }

      saveChanges({ loading: "Auto saving...", success: "Saved" });
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [viewMode]);
};
