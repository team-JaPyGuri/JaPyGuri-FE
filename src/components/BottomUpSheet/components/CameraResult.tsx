import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../Toast/useToast";
import { postTryOn } from "../../../hooks/api/postTryOn";
import { bottomUpSheetState } from "../../../stores/stateBottomUpSheet";
import { useSetRecoilState } from "recoil";
import { onErrorImg } from "../../../utils/onErrorImg";

interface CameraResultProps {
  id: string;
  img: string;
}

const CameraResult = ({ id, img }: CameraResultProps) => {
  const navigate = useNavigate();
  const showToast = useToast();
  const setBottomUpSheet = useSetRecoilState(bottomUpSheetState);

  const handleRetakeButtonClicked = () => {
    setBottomUpSheet((oldBottomUpSheetState) => ({
      ...oldBottomUpSheetState,
      visible: false,
    }));
  };

  const handleRequestButtonClicked = async (id: string, img: string) => {
    try {
      await postTryOn(id, img);
      showToast({
        message: "AI 피팅을 시작했어요. 완료되면 알려드릴게요.",
      });
      navigate("/");
    } catch {
      showToast({
        message: "현재 서버가 불안정해요. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <>
      <div className="w-full flex-row px-4 py-3">
        <img
          src={img}
          onError={onErrorImg}
          alt="Nail"
          className="w-full rounded-[4px] object-cover object-center"
        />
      </div>
      <div className="flex w-full flex-col justify-start gap-2 border-b border-grayscale-400 py-3 pl-6 pr-4 text-left">
        <span className="semibold-13 text-grayscale-900">유의 사항</span>
        <span className="regular-13 text-grayscale-600">
          • 업로드한 손 이미지는 AI 학습에 사용되지 않아요.
          <br />
          • AI 피팅 결과 생성까지는 약 10분이 걸려요.
          <br />• AI 피팅 결과는 촬영한 이미지에 따라 결과물이 달라져요.
        </span>
      </div>
      <div className="flex w-full flex-row gap-2 px-4 py-3">
        <Button onClick={() => handleRetakeButtonClicked()}>재촬영하기</Button>
        <Button onClick={() => handleRequestButtonClicked(id, img)}>
          AI 피팅 요청하기
        </Button>
      </div>
    </>
  );
};

export default CameraResult;
