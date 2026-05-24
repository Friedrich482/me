import { create } from "zustand";

type ViewMode = "write" | "preview";

type Store = {
  viewMode: ViewMode;
  handleWriteButtonClick: () => void;
  handlePreviewButtonClick: () => void;
};

export const useViewModeStore = create<Store>((set) => ({
  viewMode: "write" as const,
  handlePreviewButtonClick: () => {
    set({
      viewMode: "preview",
    });
  },

  handleWriteButtonClick: () => {
    set({
      viewMode: "write",
    });
  },
}));
