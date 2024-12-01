import { useNavigate } from "react-router-dom";
import LikeActiveIcon from "../../assets/svgs/likeActive.svg?react";

interface NailLikeCardProps {
  id: string;
  img: string;
}

const NailLikeCard = ({ id, img }: NailLikeCardProps) => {
  const navigate = useNavigate();

  const handleNailCardClicked = () => {
    navigate(`/camera/${id}`);
  };

  return (
    <div
      onClick={() => handleNailCardClicked()}
      className="flex w-1/3 shrink-0 flex-col bg-grayscale-100"
    >
      <div className="relative aspect-square w-full cursor-pointer overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <img src={img} alt="nail" className="h-full w-full object-cover" />
        <div className="absolute bottom-1 right-1">
          <LikeActiveIcon
            className={`relative left-0 top-0 animate-likeActive`}
          />
        </div>
      </div>
    </div>
  );
};

export default NailLikeCard;
