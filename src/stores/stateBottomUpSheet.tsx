import { atom } from "recoil";

interface BottomUpSheetContent {
  visible: boolean;
  title: string;
  content: JSX.Element | null;
}

export const bottomUpSheetState = atom<BottomUpSheetContent>({
  key: "BottomUpSheetState",
  default: {
    visible: false,
    title: "",
    content: null,
  },
});
