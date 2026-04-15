import { create } from "zustand";
import { login, getMe, register } from "@/shared/api/auth";
import { type UserI } from "./types";

interface sessionStore {
  user: UserI | null;
  isAuth: boolean;

  loginUser: (data: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;

  registerUser: (data: any) => Promise<void>;
}

export const useSessionStore = create<sessionStore>((set) => ({
  user: null,
  isAuth: false,

  loginUser: async (data) => {
    try {
      const response = await login(data);
      const { access_token, user } = response.data;
      localStorage.setItem("accessToken", access_token);

      set({
        user: user,
        isAuth: true,
      });
    } catch (error) {
      console.error(`Ошибка ${error}`);
    }
  },

  registerUser: async (data) => {
    try {
      const response = await register(data);
      const { access_token, user } = response.data;
      localStorage.setItem("accessToken", access_token);

      set({
        user: user,
        isAuth: true,
      });
    } catch (error) {
      console.error(`Ошибка ${error}`);
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      user: null,
      isAuth: false,
    });
  },

  checkAuth: async () => {
    try {
      const response = await getMe();
      set({
        user: response.data,
        isAuth: true,
      });
    } catch (error) {
      console.error(`Ошибка ${error}`);

      localStorage.removeItem("accessToken");
      set({ user: null, isAuth: false });
    }
  },
}));
