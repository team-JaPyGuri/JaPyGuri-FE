import Button from "../../../components/Button/Button";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Toast/useToast";
import { onErrorImg } from "../../../utils/onErrorImg";

interface AiFittingResultProps {
  before: string;
  after: string;
}

const AiFittingResult = ({ before, after }: AiFittingResultProps) => {
  const navigate = useNavigate();
  const showToast = useToast();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDragging = useRef(false);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    updatePosition(e);
  };

  const stopDrag = () => {
    isDragging.current = false;
  };

  const updatePosition = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return;

    const container = sliderRef.current;
    const containerRect = container.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;

    let newPosition =
      ((clientX - containerRect.left) / containerRect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  };

  useEffect(() => {
    // eslint-disable-next-line
    const handleMove = (e: MouseEvent | TouchEvent) => updatePosition(e as any);
    const handleStop = () => stopDrag();

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleStop);
    window.addEventListener("touchend", handleStop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleStop);
      window.removeEventListener("touchend", handleStop);
    };
  }, []);

  const toDataURL = (url: string) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  const handleDownloadButtonClicked = async () => {
    const link = document.createElement("a");
    link.href = await toDataURL("https" + after.substring(4));
    link.setAttribute("download", "download");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="w-full flex-row px-4 py-3">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-[4px]"
          ref={sliderRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <img
            src={before}
            onError={onErrorImg}
            alt="Before"
            className="absolute left-0 top-0 aspect-square h-full w-full object-cover object-left"
          />
          <img
            src={after}
            onError={onErrorImg}
            alt="After"
            className="absolute right-0 top-0 aspect-square h-full object-cover object-right"
            style={{
              clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            }}
          />
          <div
            className="absolute bottom-0 top-0 z-10 h-full w-1 cursor-ew-resize border border-grayscale-400 bg-grayscale-100"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 px-4 py-3">
        <div className="flex w-full flex-row gap-2">
          <Button
            onClick={() =>
              showToast({
                message: "데모 버전에서는 해당 기능을 제공할 수 없어요.",
              })
            }
          >
            바로 예약하기
          </Button>
          <Button onClick={() => handleDownloadButtonClicked()}>
            이미지 저장하기
          </Button>
        </div>
        <Button onClick={() => navigate(`/request-map/`)}>
          해당 네일아트 요청하기
        </Button>
      </div>
    </>
  );
};

export default AiFittingResult;
