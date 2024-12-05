import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useToast } from "./../../../components/Toast/useToast";
import Coordinates from "../../../types/Coordinates";
import { useRecoilValue } from "recoil";
import { stateSocket } from "../../../stores/stateSocket";

interface MapFooterProps {
  centerCoords: Coordinates;
  currentAddress: string;
  activeMarker: naver.maps.Marker[];
  designId: string;
  className?: string;
}

const MapFooter = ({
  centerCoords,
  currentAddress,
  activeMarker,
  designId,
  className,
}: MapFooterProps) => {
  const showToast = useToast();
  const navigate = useNavigate();
  const socket = useRecoilValue(stateSocket);

  const handleRequestButtonClicked = () => {
    if (!activeMarker.length) {
      showToast({
        message: "근처에 네일샵이 없어요. 다른 위치로 지도를 이동해주세요.",
      });
      return;
    }
    const { latitude, longitude } = centerCoords;
    const requestShopList = [...activeMarker]
      .sort((a, b) => {
        const { y: alat, x: alng } = a.getPosition();
        const { y: blat, x: blng } = b.getPosition();
        const aDistance = (latitude - alat) ^ (2 + (longitude - alng)) ^ 2;
        const bDistance = (latitude - blat) ^ (2 + (longitude - blng)) ^ 2;
        return aDistance - bDistance;
      })
      .slice(0, 5);

    requestShopList.forEach((marker) => {
      if (socket)
        socket.send(
          JSON.stringify({
            action: "request_service",
            data: {
              customer_key: localStorage.getItem("socketUserId"),
              design_key: designId,
              shop_key: marker.getOptions("title"),
              contents: "",
            },
          }),
        );
    });
    if (socket)
      socket.send(
        JSON.stringify({
          action: "request_service",
          data: {
            customer_key: localStorage.getItem("socketUserId"),
            design_key: designId,
            shop_key: "04d4a60a-f612-4119-967b-2971a6c3b41d",
            contents: "",
          },
        }),
      );

    navigate("/");
    showToast({
      message: `${requestShopList.length}개의 네일샵에 요청을 보냈어요. 응답이 오면 알려드릴게요.`,
    });
  };

  return (
    <div
      className={`${className} flex w-full flex-col items-center justify-center rounded-t-lg border-x border-t border-grayscale-300 bg-grayscale-100 pb-2`}
    >
      <div className="flex w-full flex-col items-center justify-start py-2">
        <div className="h-1 w-9 rounded-sm bg-grayscale-400" />
      </div>
      <div className="flex w-full flex-col justify-between gap-2 border-b border-gray-300 px-6 py-3">
        <span className="semibold-16 text-grayscale-900">현재 위치</span>
        <span className="regular-13 text-grayscale-600">{currentAddress}</span>
        <span className="semibold-13 text-grayscale-900">
          {activeMarker.length
            ? `${activeMarker.length}개의 네일샵이 근처에 있어요.`
            : "근처에 네일샵이 없어요. 다른 위치로 지도를 이동해주세요."}
        </span>
      </div>
      <div className="w-full px-4 py-3">
        <Button
          className={activeMarker.length ? "" : "!bg-grayscale-500"}
          onClick={() => handleRequestButtonClicked()}
        >
          네일아트 요청하기
        </Button>
      </div>
    </div>
  );
};

export default MapFooter;
