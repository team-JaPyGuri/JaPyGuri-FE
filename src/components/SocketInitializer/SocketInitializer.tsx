import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import { stateUser } from "../../stores/stateUser";

const KEY_REGEXP =
  /Connected as customer: 자파구리, key=(?<key>[0-9a-zA-Z/-]+)/;

const SocketInitializer = () => {
  const user = useRecoilValue(stateUser);
  const setSocket = useSetRecoilState(stateSocket);

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

      if (KEY_REGEXP.test(result.message)) {
        localStorage.setItem(
          "socketUserId",
          result.message.match(KEY_REGEXP).groups.key,
        );
      } else if (result.type === "completed_request") {
        console.log("WebSocket send request_service complete.");
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
