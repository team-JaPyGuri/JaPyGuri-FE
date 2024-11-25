import LikeNotActiveIcon from "../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";
import NailDetail from "../../components/BottomUpSheet/components/NailDetail";

import { useEffect, useState } from "react";
import { useBottomUpSheet } from "../../components/BottomUpSheet/useBottomUpSheet";
import { stopPropagation } from "../../utils/stopPropagation";
import { toggleLike } from "../../api/likeToggle";
import { useToast } from "../Toast/useToast";

interface CardProps {
  id: string;
  img: string;
  likeDefault: boolean;
  price: string;
  like: number;
  rowScroll?: boolean;
}

const NailInfoCard = ({
  id,
  img,
  price,
  like,
  likeDefault,
  rowScroll = false,
}: CardProps) => {
  const showToast = useToast();
  const showBottomUpSheet = useBottomUpSheet();
  const [likeCount, setLikeCount] = useState(+like);
  const [likeActive, setLikeActive] = useState(likeDefault);

  useEffect(() => {
    setLikeCount((oldLikeCount) => oldLikeCount + (likeActive ? 1 : -1));
  }, [likeActive]);

  const handleLikeClicked = async (id: string, event: React.MouseEvent) => {
    stopPropagation(event);
    try {
      await toggleLike(id);
      setLikeActive(!likeActive);
      showToast({
        message: likeActive
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
    <div
      onClick={() =>
        showBottomUpSheet({
          title: "상세정보",
          content: (
            <NailDetail
              id={id}
              img={img}
              price={price}
              likeCount={likeCount}
              likeActive={likeActive}
              setLikeActive={setLikeActive}
            />
          ),
        })
      }
      className={`flex ${rowScroll ? "w-[30%]" : "w-1/3"} shrink-0 flex-col bg-grayscale-100`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <img
          className="absolute left-0 top-0 h-full w-full object-cover object-center"
          src={img}
          alt="nail"
        />
        <button
          onClick={(event: React.MouseEvent) => handleLikeClicked(id, event)}
          className="absolute bottom-1 right-1"
        >
          {likeActive ? (
            <LikeActiveIcon
              className={`${likeActive && "animate-likeActive"} relative left-0 top-0`}
            />
          ) : (
            <LikeNotActiveIcon
              className={`${likeActive && "animate-likeActive"} relative left-0 top-0`}
            />
          )}
        </button>
      </div>
      <div className="flex flex-col justify-start p-2">
        <span className="regular-13 flex flex-row items-center gap-1 text-red">
          <LikeActiveIcon className="h-3 w-3" />
          {Intl.NumberFormat().format(likeCount)}
        </span>
        <span className="regular-13 truncate text-grayscale-600">
          예상가{" "}
          <span className="semibold-13 truncate text-grayscale-900">
            {Intl.NumberFormat().format(+price)}원
          </span>
        </span>
      </div>
    </div>
  );
};

export default NailInfoCard;
