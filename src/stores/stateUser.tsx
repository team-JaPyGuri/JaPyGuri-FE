import { atom } from "recoil";

export interface stateUser {
  userType: "customer" | "shop";
  userId: string;
}

export const stateUser = atom<stateUser>({
  key: "stateUser",
  default: {
    userType: "customer",
    userId: import.meta.env.VITE_API_USER_ID as string,
  },
});
