// toastAtom.ts
import { atom } from "recoil";

interface ToastMessage {
  id: number;
  message: string;
  link?: string;
}

export const toastListState = atom<ToastMessage[]>({
  key: "toastListState",
  default: [],
});
