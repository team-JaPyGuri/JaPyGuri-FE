import { useBottomUpSheet } from "./../BottomUpSheet/useBottomUpSheet";
import AiFittingResult from "../BottomUpSheet/components/AiFittingResult";
import { onErrorImg } from "../../utils/onErrorImg";

interface NailLikeCardProps {
  id?: string;
  before: string;
  after: string;
}

const AiResultCard = ({ id = "0", before, after }: NailLikeCardProps) => {
  const showBottomUpSheet = useBottomUpSheet();

  const handleNailCardClicked = () => {
    showBottomUpSheet({
      title: "AI 피팅 결과 확인하기",
      content: <AiFittingResult before={before} after={after} />,
    });
  };

  return (
    <div
      onClick={() => handleNailCardClicked()}
      className="flex w-1/3 shrink-0 flex-col bg-grayscale-100"
    >
      <div className="relative aspect-square w-full cursor-pointer overflow-hidden bg-grayscale-900 bg-opacity-[0.02]">
        <img
          src={after}
          onError={onErrorImg}
          alt="nail"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AiResultCard;
