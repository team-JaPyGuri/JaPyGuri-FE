import LikeNotActiveIcon from "../../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../../assets/svgs/likeActive.svg?react";
import Button from "../../../components/Button/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface NailDetailProps {
  img: string;
  tags: string[];
  likes: number;
  likeActive: boolean;
  setLikeActive: (likeActive: boolean) => void;
}

const NailDetail = ({
  img,
  tags,
  likes,
  likeActive,
  setLikeActive,
}: NailDetailProps) => {
  const navigate = useNavigate();
  const [localLikeActive, setLocalLikeActive] = useState(likeActive);

  useEffect(() => {
    setLikeActive(localLikeActive);
  }, [setLikeActive, localLikeActive]);

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
          <span className="semibold-13 text-grayscale-900">
            {tags && tags.map((tag) => `#${tag} `)}
          </span>
          <span className="regular-13 text-grayscale-600">
            이 네일아트를 {likes}명이 좋아해요.
          </span>
        </div>
        <button
          onClick={() => setLocalLikeActive(!localLikeActive)}
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
          <Button onClick={() => navigate("/request-map")}>
            바로 예약하기
          </Button>
          <Button>AI 피팅 체험하기</Button>
        </div>
        <Button>해당 네일아트 요청하기</Button>
      </div>
    </>
  );
};

export default NailDetail;
