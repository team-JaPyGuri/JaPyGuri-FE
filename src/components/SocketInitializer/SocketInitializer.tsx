import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import { stateUser } from "../../stores/stateUser";
import { useToast } from "../Toast/useToast";

const USER_KEY_REGEXP =
  /Connected as customer: 자파구리, key=(?<key>[0-9a-zA-Z/-]+)/;
const SHOP_KEY_REGEXP =
  /Connected as shop: 유어썸뷰티, key=(?<key>[0-9a-zA-Z/-]+)/;

const SocketInitializer = () => {
  const user = useRecoilValue(stateUser);
  const setSocket = useSetRecoilState(stateSocket);
  const showToast = useToast();

  useEffect(() => {
    if (!user) return;

    const socketUrl = `${import.meta.env.VITE_NAILO_SOCKET_URL}/ws/${user.userType}/${user.userId}/`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("WebSocket connection opened:", socketUrl);
    };

    socket.onmessage = (event) => {
      const result = JSON.parse(event.data);
      console.log("WebSocket message received:", result);

      if (USER_KEY_REGEXP.test(result.message)) {
        localStorage.setItem(
          "socketUserId",
          result.message.match(USER_KEY_REGEXP).groups.key,
        );
      } else if (SHOP_KEY_REGEXP.test(result.message)) {
        localStorage.setItem(
          "socketShopId",
          result.message.match(SHOP_KEY_REGEXP).groups.key,
        );
      } else if (result.type === "completed_request") {
        console.log("WebSocket send request_service complete.");
      } else if (result.type === "tryon_result") {
        showToast({
          message: "AI 피팅이 완료되었어요. 지금 바로 확인해보세요.",
          link: "/ai-result",
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket((prevSocket) => {
      if (prevSocket) {
        console.log("Closing previous WebSocket connection");
        prevSocket.close();
      }
      return socket;
    });

    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
      setSocket(null);
    };
  }, [user, setSocket]);

  return null;
};

export default SocketInitializer;
