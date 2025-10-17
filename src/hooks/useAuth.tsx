import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../types/user";
import { Permissions } from "../types/permissions";

interface AuthStore {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  permissions: Permissions | null;
  signOut: () => void;
  signIn: ({
    token,
    user,
    permissions,
  }: {
    token: string;
    user: User;
    permissions: Permissions;
  }) => void;
}

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      token: null,
      permissions: null,
      signOut: () => {
        set({ isLoggedIn: false, token: null, user: null, permissions: null });
        localStorage.clear();
      },
      signIn: ({ token, user, permissions }) => {
        set({ isLoggedIn: true, token, user, permissions });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);
