import { useState, useEffect } from "react";
import { useBottomUpSheet } from "../BottomUpSheet/useBottomUpSheet";
import { stopPropagation } from "../../utils/stopPropagation";

import LikeNotActiveIcon from "../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";
import NailDetail from "../BottomUpSheet/components/NailDetail";

interface NailSnapCardProps {
  img: string;
  likeDefault: boolean;
  price: string;
  like: number;
  rowScroll?: boolean;
}

const NailSnapCard = ({ img, price, like, likeDefault }: NailSnapCardProps) => {
  const showBottomUpSheet = useBottomUpSheet();
  const [likeCount, setLikeCount] = useState(+like);
  const [likeActive, setLikeActive] = useState(likeDefault);

  useEffect(() => {
    setLikeCount((oldLikeCount) => oldLikeCount + (likeActive ? 1 : -1));
  }, [likeActive]);

  const handleLikeClicked = (event: React.MouseEvent) => {
    stopPropagation(event);
    setLikeActive(!likeActive);
  };

  return (
    <div
      onClick={() =>
        showBottomUpSheet({
          title: "상세정보",
          content: (
            <NailDetail
              img={img}
              price={price}
              likeCount={likeCount}
              likeActive={likeActive}
              setLikeActive={setLikeActive}
            />
          ),
        })
      }
      className="flex w-1/3 shrink-0 flex-col bg-grayscale-100"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <img src={img} alt="nail" className="h-full w-full object-cover" />
        <button
          onClick={(event) => handleLikeClicked(event)}
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
