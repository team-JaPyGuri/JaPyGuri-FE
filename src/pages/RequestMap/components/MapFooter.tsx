import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useToast } from "./../../../components/Toast/useToast";

interface MapFooterProps {
  currentAddress: string;
  activeMarkerCount: number;
  className?: string;
}

const MapFooter = ({
  currentAddress,
  activeMarkerCount,
  className,
}: MapFooterProps) => {
  const showToast = useToast();
  const navigate = useNavigate();

  const handleRequestButtonClicked = () => {
    navigate("/");
    showToast({
      message: "네일아트 요청이 완료되었어요. 응답이 오면 알려드릴게요.",
    });
  };

  return (
    <div
      className={`${className} flex w-full flex-col items-center justify-center rounded-t-lg border-x border-t border-grayscale-300 bg-grayscale-100`}
    >
      <div className="flex w-full flex-col items-center justify-start py-2">
        <div className="h-1 w-9 rounded-sm bg-grayscale-400" />
      </div>
      <div className="flex w-full flex-col justify-between gap-2 border-b border-gray-300 px-6 py-3">
        <span className="semibold-16 text-grayscale-900">현재 위치</span>
        <span className="regular-13 text-grayscale-600">{currentAddress}</span>
        <span className="semibold-13 text-grayscale-900">
          {activeMarkerCount}개의 네일샵이 근처에 있어요.
        </span>
      </div>
      <div className="w-full px-4 py-3">
        <Button onClick={() => handleRequestButtonClicked()}>
          네일아트 요청하기
        </Button>
      </div>
    </div>
  );
};

export default MapFooter;
