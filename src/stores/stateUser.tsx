import { atom } from "recoil";

export interface stateUser {
  userType: "customer" | "shop";
  userId: string;
}

export const stateUser = atom<stateUser | null>({
  key: "stateUser",
  default: null,
});
