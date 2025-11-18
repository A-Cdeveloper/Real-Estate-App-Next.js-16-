import { create } from "zustand";

type SidebarState = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export const useSidebarStore = create<SidebarState>()((set) => ({
  isCollapsed: true, // Collapsed initially on both mobile and desktop
  setIsCollapsed: (value) =>
    set((state) => ({
      isCollapsed:
        typeof value === "function" ? value(state.isCollapsed) : value,
    })),
}));
