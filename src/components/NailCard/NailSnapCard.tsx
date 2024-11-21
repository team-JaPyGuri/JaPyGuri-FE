import { useState } from "react";
import { useBottomUpSheet } from "../BottomUpSheet/useBottomUpSheet";
import { stopPropagation } from "../../utils/stopPropagation";

import LikeNotActiveIcon from "../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";
import NailDetail from "../BottomUpSheet/components/NailDetail";

interface NailSnapCardProps {
  img: string;
  tags: string[];
  like: number;
}

const NailSnapCard = ({ img, tags, like }: NailSnapCardProps) => {
  const showBottomUpSheet = useBottomUpSheet();
  const [likeActive, setLikeActive] = useState(false);

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
              tags={tags}
              like={like}
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
