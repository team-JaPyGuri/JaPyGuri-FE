import { atom } from "recoil";

export const stateSocket = atom<WebSocket | null>({
  key: "socketState",
  default: null,
});
