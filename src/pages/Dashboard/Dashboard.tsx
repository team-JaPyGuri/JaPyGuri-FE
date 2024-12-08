import { useToast } from "../../components/Toast/useToast";
import ShopHeader from "../../components/Header/ShopHeader";
import Footer from "../../components/Footer/Footer";
import ListView from "../../components/ListView/ListView";
import { useRecoilValue } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import { useState, useEffect, useRef } from "react";
import { stateRequestList } from "../../stores/stateRequestList";
import Button from "../../components/Button/Button";

interface RequestResultData {
  request_key: string;
  customer_name: string;
  design_name: string;
  status: string;
  created_at: string;
  price: number;
  contents: string;
}

interface ResponseCardProps {
  requestData: RequestResultData;
}

const ResponseCard = ({ requestData }: ResponseCardProps) => {
  const showToast = useToast();
  const socket = useRecoilValue(stateSocket);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const nailPriceRef = useRef<HTMLInputElement>(null);
  const nailContentsRef = useRef<HTMLInputElement>(null);

  const formatFullDate = (date: Date) => {
    const yy = String(date.getFullYear());
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시 ${min}분에 요청`;
  };

  const handleRejectNailClicked = () => {
    if (!nailPriceRef.current || !nailContentsRef.current) return;

    if (socket) {
      const resquestKey = requestData.request_key;
      socket.send(
        JSON.stringify({
          action: "respond_service",
          data: {
            request_key: resquestKey,
            status: "rejected",
            price: 0,
            contents: "",
          },
        }),
      );
      showToast({
        message: "고객 요청을 거절했어요.",
      });
      setIsCardOpen(false);
      nailPriceRef.current.value = nailContentsRef.current.value = "";
    }
  };

  const handleAcceptNailClicked = () => {
    if (!nailPriceRef.current || !nailContentsRef.current) return;

    const nailPrice = nailPriceRef.current.value;
    const nailContents = nailContentsRef.current.value;

    if (!nailPrice || !nailContents) {
      showToast({
        message: "예상 금액과 전달 사항을 모두 입력해주세요.",
      });
      return;
    }

    if (socket) {
      const resquestKey = requestData.request_key;
      socket.send(
        JSON.stringify({
          action: "respond_service",
          data: {
            request_key: resquestKey,
            status: "accepted",
            price: nailPrice,
            contents: nailContents,
          },
        }),
      );
      showToast({
        message: "고객 요청을 수락했어요.",
      });
      setIsCardOpen(false);
      nailPriceRef.current.value = nailContentsRef.current.value = "";
    }
  };

  return (
    <div
      className={`${isCardOpen ? "max-h-[234px]" : "max-h-[84px]"} flex w-1/2 flex-col overflow-hidden px-8 duration-300`}
    >
      <div
        onClick={() => setIsCardOpen((prevState) => !prevState)}
        className="flex w-full cursor-pointer flex-col gap-1 border-b border-grayscale-400 py-4"
      >
        <div className="flex w-full flex-row items-center justify-between gap-3">
          <span className="medium-18 flex-1 text-grayscale-900">
            '{requestData.customer_name}' 님의 요청
          </span>
          <span className="regular-13 text-grayscale-600">
            {formatFullDate(new Date(requestData.created_at))}
          </span>
        </div>
        <span className="regular-13 text-grayscale-600">
          플랫폼 기준{" "}
          <span className="regular-13 text-red">{requestData.price}원</span>{" "}
          예상
        </span>
      </div>
      <div className="flex w-full flex-col gap-3 border-b border-grayscale-400 py-3">
        <div className="flex w-full flex-row gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <span className="semibold-14 w-full pl-2 text-grayscale-900">
              예상 금액
            </span>
            <input
              type="number"
              ref={nailPriceRef}
              placeholder="예상 금액 입력"
              min="0"
              max="999999"
              className="regular-14 text-grayscale-6 w-full rounded-md border border-grayscale-400 px-4 py-2"
            />
          </div>
          <div className="flex-2 flex flex-col gap-2">
            <span className="semibold-14 w-full pl-2 text-grayscale-900">
              전달 사항
            </span>
            <input
              type="text"
              ref={nailContentsRef}
              placeholder="고객 전달 사항 입력"
              maxLength={50}
              className="regular-14 text-grayscale-6 w-full rounded-md border border-grayscale-400 px-4 py-2"
            />
          </div>
        </div>
        <div className="flex w-full flex-row gap-4">
          <Button onClick={() => handleAcceptNailClicked()}>
            응답 전송하기
          </Button>
          <Button onClick={() => handleRejectNailClicked()}>
            요청 거부하기
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const requestResultList = useRecoilValue(stateRequestList);
  const socket = useRecoilValue(stateSocket);

  useEffect(() => {
    if (socket) {
      const handleOpen = () => {
        const shopKey = localStorage.getItem("socketShopId");
        socket.send(
          JSON.stringify({
            action: "get_requests",
            data: {
              shop_key: shopKey,
            },
          }),
        );
      };

      if (socket.readyState === WebSocket.OPEN) {
        handleOpen();
      } else {
        socket.addEventListener("open", handleOpen);
      }

      return () => {
        socket.removeEventListener("open", handleOpen);
      };
    }
  }, [socket]);

  return (
    <main className="relative flex min-h-dvh w-full flex-col bg-grayscale-200">
      <ShopHeader subTitle="유어썸뷰티" />
      <ListView
        title="고객 네일아트 요청"
        noContent={{
          title: "아직 도착한 요청이 없어요.",
          subtitle: "요청이 도착하면 여기서 확인하실 수 있어요.",
        }}
      >
        {requestResultList &&
          requestResultList.map((requestData: RequestResultData, index) => (
            <ResponseCard
              key={`${index}-${requestData.request_key}`}
              requestData={requestData}
            />
          ))}
      </ListView>
      <Footer />
    </main>
  );
};

export default Dashboard;
