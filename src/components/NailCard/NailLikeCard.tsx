import { useNavigate } from "react-router-dom";
import { onErrorImg } from "../../utils/onErrorImg";

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
        <img
          src={img}
          onError={onErrorImg}
          alt="nail"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default NailLikeCard;
