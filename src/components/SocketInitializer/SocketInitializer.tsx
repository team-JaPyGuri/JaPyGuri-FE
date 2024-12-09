import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import { stateUser } from "../../stores/stateUser";
import { useToast } from "../Toast/useToast";
import { stateRequestResult } from "../../stores/stateRequestResult";
import { stateRequestList } from "../../stores/stateRequestList";

interface RequestDataProps {
  designKey: string;
  shop_requests: ResponseDataProps[];
}
interface ResponseDataProps {
  request_details: {
    created_at: string;
    request: {
      price: number;
      contents: string;
    };
    request_key: string;
    response: {
      response_key: string;
      price: number;
      contents: string;
      created_at: string;
    } | null;
    status: string;
  }[];
  shop_name: string;
}

const USER_KEY_REGEXP =
  /Connected as customer: 자파구리, key=(?<key>[0-9a-zA-Z/-]+)/;
const SHOP_KEY_REGEXP =
  /Connected as shop: 유어썸뷰티, key=(?<key>[0-9a-zA-Z/-]+)/;

const SocketInitializer = () => {
  const user = useRecoilValue(stateUser);
  const setSocket = useSetRecoilState(stateSocket);
  const setRequesetResultData = useSetRecoilState(stateRequestResult);
  const setRequestList = useSetRecoilState(stateRequestList);
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
        showToast({
          message:
            "선택하신 샵에 요청이 전달되었어요. 응답이 오면 알려드릴게요.",
        });
      } else if (result.type === "notify_tryon_result") {
        showToast({
          message: "AI 피팅이 완료되었어요. 지금 바로 확인해보세요.",
          link: "/ai-result",
        });
      } else if (result.type === "response_list") {
        const requestResultData = JSON.parse(event.data).designs;
        requestResultData.sort((a: RequestDataProps, b: RequestDataProps) => {
          const aData = a.shop_requests[0].request_details;
          const bData = b.shop_requests[0].request_details;
          const aTtime = aData[aData.length - 1].created_at;
          const bTime = bData[bData.length - 1].created_at;
          return new Date(bTime).getTime() - new Date(aTtime).getTime();
        });
        setRequesetResultData(requestResultData);
      } else if (result.type === "request_list") {
        setRequestList(JSON.parse(event.data).requests.reverse());
      } else if (result.type === "completed_response") {
        showToast({
          message: "고객에게 요청이 전달되었어요.",
        });
      } else if (result.type === "new_request") {
        showToast({
          message: "새로운 요청이 도착했어요. 지금 바로 확인해보세요.",
          link: "/dashboard",
        });
      } else if (result.type === "new_response") {
        console.log(1);
        showToast({
          message: "샵 응답이 도착했어요. 지금 바로 확인해보세요.",
          link: "/request-result",
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setSocket(socket);

    return () => {
      console.log("Cleaning up WebSocket connection");
      socket.close();
      setSocket(null);
    };
  }, [user, setSocket, showToast, setRequesetResultData, setRequestList]);

  return null;
};

export default SocketInitializer;
