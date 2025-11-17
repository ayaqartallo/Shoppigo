import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  token: string | null;
  redirectAfterLogin: string | null;
  login: (token: string, redirectTo?: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  token: null,
  redirectAfterLogin: null,
  login: (token, redirectTo) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true, token, redirectAfterLogin: redirectTo || null });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false, token: null, redirectAfterLogin: null });
  },
}));
