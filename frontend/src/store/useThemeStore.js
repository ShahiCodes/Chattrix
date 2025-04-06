import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));

if (localStorage.getItem("chat-theme")) {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("chat-theme"));
  }