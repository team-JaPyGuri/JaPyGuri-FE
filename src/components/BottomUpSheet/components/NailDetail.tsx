import LikeNotActiveIcon from "../../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../../assets/svgs/likeActive.svg?react";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Toast/useToast";
import { toggleLike } from "../../../hooks/api/likeToggle";

interface NailDetailProps {
  id: string;
  img: string;
  price: string;
  likeCount: number;
  likeActive: boolean;
  setLikeActive: (likeActive: boolean) => void;
}

const NailDetail = ({
  id,
  img,
  price,
  likeCount,
  likeActive,
  setLikeActive,
}: NailDetailProps) => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  const [localLikeActive, setLocalLikeActive] = useState(likeActive);

  const handleLikeClicked = async (id: string) => {
    try {
      await toggleLike(id);
      setLocalLikeActive(!localLikeActive);
      setLikeActive(!localLikeActive);
      setLocalLikeCount(localLikeCount + (localLikeActive ? -1 : 1));
      showToast({
        message: localLikeActive
          ? "좋아요가 취소되었어요."
          : "좋아요에 추가되었어요.",
      });
    } catch {
      showToast({
        message: "현재 서버가 불안정해요. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <>
      <div className="w-full flex-row px-4 py-3">
        <img
          src={img}
          alt="Nail"
          className="aspect-square w-full rounded-[4px] object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between gap-6 border-b border-grayscale-400 py-3 pl-6 pr-4">
        <div className="flex flex-col">
          <span className="regular-13 truncate text-grayscale-600">
            예상가{" "}
            <span className="semibold-13 truncate text-grayscale-900">
              {Intl.NumberFormat().format(+price)}원
            </span>
          </span>
          <span className="regular-13 text-grayscale-600">
            이 네일아트를 {localLikeCount}명이 좋아해요.
          </span>
        </div>
        <button
          onClick={() => handleLikeClicked(id)}
          className="flex flex-row items-center gap-1 rounded-[4px] border border-gray-400 p-[6px]"
        >
          {localLikeActive ? (
            <LikeActiveIcon
              className={`${localLikeActive && "animate-likeActive"} h-4 w-4`}
            />
          ) : (
            <LikeNotActiveIcon
              className={`${localLikeActive && "animate-likeActive"} h-4 w-4`}
            />
          )}
          <span className="regular-13">좋아요</span>
        </button>
      </div>
      <img className="w-full" />
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
          <Button>AI 피팅 체험하기</Button>
        </div>
        <Button onClick={() => navigate(`/request-map/${id}`)}>
          해당 네일아트 요청하기
        </Button>
      </div>
    </>
  );
};

export default NailDetail;
