import { useCallback } from "react";
import { stateSocket } from "../../stores/stateSocket";
import { useRecoilValue } from "recoil";

type SendMessageData =
  | {
      request_key: string;
      status: "accepted";
      price: number;
      contents: string;
    }
  | {
      request_key: string;
      status: "rejected";
      price: number;
      contents: string;
    }
  | {
      customer_key: string;
      design_key: string;
      shop_key: string;
      contents: string;
    }
  | {
      customer_key: string | null;
    }
  | {
      shop_key: string | null;
    };

interface sendMessageProps {
  action: string;
  data: SendMessageData;
  onSuccess?: () => void;
}

const useSendMessage = () => {
  const socket = useRecoilValue(stateSocket);
  const sendMessage = useCallback(
    ({ action, data, onSuccess }: sendMessageProps) => {
      if (import.meta.env.VITE_USE_MOCK_DATA === "true") return;
      if (!socket) {
        console.error("Socket is not connected.");
        return;
      }

      const message = {
        action,
        data,
      };

      try {
        socket.send(JSON.stringify(message));
        onSuccess?.();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    },
    [socket],
  );

  return sendMessage;
};

export default useSendMessage;
