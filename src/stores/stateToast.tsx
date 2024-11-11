// toastAtom.ts
import { atom } from "recoil";
import { ToastMessage } from "../components/Toast/ToastTypes";

export const toastListState = atom<ToastMessage[]>({
  key: "toastListState",
  default: [],
});
