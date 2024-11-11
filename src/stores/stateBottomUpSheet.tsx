import { atom } from "recoil";

interface BottomUpSheetContent {
  visible: boolean;
  content: JSX.Element | null;
}

export const BottomUpSheetState = atom<BottomUpSheetContent>({
  key: "BottomUpSheetState",
  default: {
    visible: false,
    content: null,
  },
});
