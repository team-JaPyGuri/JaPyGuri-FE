import LikeNotActiveIcon from "../../../assets/svgs/likeNotActive.svg?react";
import LikeActiveIcon from "../../../assets/svgs/likeActive.svg?react";
import { useState } from "react";

const Card = () => {
  const [likeActive, setLikeActive] = useState(false);

  return (
    <div className="flex w-1/3 shrink-0 flex-col bg-grayscale-100">
      <div className="relative aspect-square w-full overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <button
          onClick={() => setLikeActive(!likeActive)}
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

const NailSnap = () => {
  return (
    <div className="mb-32 flex w-full flex-wrap justify-start">
      {[...Array(30)].map((_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default NailSnap;
