import { useEffect } from "react";

export const useAutoSave = (
  saveChanges: (options?: { loading: string; success: string }) => void,
) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      saveChanges({ loading: "Auto saving...", success: "Saved" });
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
