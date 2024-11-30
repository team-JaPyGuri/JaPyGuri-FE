import { atom, selector } from "recoil";
import { stateUser } from "./stateUser";

const KEY_REGEXP =
  /Connected as customer: 자파구리, key=(?<key>[0-9a-zA-Z/-]+)/;

export const stateSocket = atom<WebSocket | null>({
  key: "socketState",
  default: null,
});

export const socketSelector = selector({
  key: "socketSelector",
  get: ({ get }) => {
    const user = get(stateUser);
    const socketUrl = `${import.meta.env.VITE_NAILO_SOCKET_URL}/ws/${user.userType}/${user.userId}/`;

    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    socket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      console.log("WebSocket message received:", result);
      if (KEY_REGEXP.test(result.message)) {
        localStorage.setItem(
          "socketUserId",
          event.data.match(KEY_REGEXP).groups.key,
        );
      } else {
        if (result.type === "completed_request") {
          console.log("WebSocket send request_service complete.");
        }
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return socket;
  },
});
