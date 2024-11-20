import LikeNotActiveIcon from "../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";
import NailDetail from "../../components/BottomUpSheet/components/NailDetail";

import { useState } from "react";
import { useBottomUpSheet } from "../../components/BottomUpSheet/useBottomUpSheet";
import { stopPropagation } from "../../utils/stopPropagation";

interface CardProps {
  img: string;
  tags: string[];
  likes: number;
  rowScroll?: boolean;
}

const NailInfoCard = ({ img, tags, likes, rowScroll = false }: CardProps) => {
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
              likes={likes}
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
          onClick={handleLikeClicked}
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
          {likes}
        </span>
        <span className="semibold-13 truncate text-grayscale-900">
          {tags && tags.map((tag) => `#${tag} `)}
        </span>
      </div>
    </div>
  );
};

export default NailInfoCard;
