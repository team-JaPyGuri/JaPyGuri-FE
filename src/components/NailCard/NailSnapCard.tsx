import { useState, useEffect } from "react";
import { useBottomUpSheet } from "../BottomUpSheet/useBottomUpSheet";
import { stopPropagation } from "../../utils/stopPropagation";
import { toggleLike } from "../../hooks/api/likeToggle";
import { useToast } from "../Toast/useToast";
import { onErrorImg } from "../../utils/onErrorImg";

import LikeNotActiveIcon from "../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";
import NailDetail from "../BottomUpSheet/components/NailDetail";

interface NailSnapCardProps {
  id: string;
  img: string;
  likeDefault: boolean;
  aiFitActive: boolean;
  price: number;
  like: number;
  rowScroll?: boolean;
}

const NailSnapCard = ({
  id,
  img,
  price,
  like,
  likeDefault,
  aiFitActive,
}: NailSnapCardProps) => {
  const showToast = useToast();
  const showBottomUpSheet = useBottomUpSheet();
  const [likeCount, setLikeCount] = useState(+like + (likeDefault ? -1 : 1));
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
              aiFitActive={aiFitActive}
              setLikeActive={setLikeActive}
            />
          ),
        })
      }
      className="flex w-1/3 shrink-0 flex-col bg-grayscale-100"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <img
          src={img}
          onError={onErrorImg}
          alt="nail"
          className="h-full w-full object-cover"
        />
        <button
          onClick={(event) => handleLikeClicked(id, event)}
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
    </div>
  );
};

export default NailSnapCard;
