import { useSetRecoilState } from "recoil";
import { bottomUpSheetState } from "../../stores/stateBottomUpSheet";

interface UseBottomUpSheetProps {
  title: string;
  content: JSX.Element | null;
}

export const useBottomUpSheet = () => {
  const setBottomUpSheet = useSetRecoilState(bottomUpSheetState);

  const showBottomUpSheet = ({ title, content }: UseBottomUpSheetProps) => {
    setBottomUpSheet((oldBottomUpSheetState) => ({
      ...oldBottomUpSheetState,
      visible: true,
      title,
      content,
    }));
  };

  return showBottomUpSheet;
};
