import CategoryIcon from "../../assets/svgs/category.svg?react";
import AiIcon from "../../assets/svgs/ai.svg?react";
import HomeIcon from "../../assets/svgs/home.svg?react";
import LikeIcon from "../../assets/svgs/like.svg?react";
import RequestIcon from "../../assets/svgs/request.svg?react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Toast/useToast";

const NavigationBar = () => {
  const navigate = useNavigate();
  const showToast = useToast();

  const LINKS = [
    {
      name: "카테고리",
      icon: CategoryIcon,
      handler: () =>
        showToast({ message: "데모 버전에서는 해당 기능을 제공할 수 없어요." }),
    },
    {
      name: "AI 피팅",
      icon: AiIcon,
      handler: () => navigate("/ai-result"),
    },
    {
      name: "홈",
      icon: HomeIcon,
      handler: () => navigate("/"),
    },
    {
      name: "좋아요",
      icon: LikeIcon,
      handler: () => navigate("/like"),
    },
    {
      name: "샵 요청",
      icon: RequestIcon,
      handler: () => navigate("/request-result"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 z-10 flex w-full min-w-[20rem] max-w-[37.5rem] -translate-x-1/2 flex-row gap-3 border-t border-gray-300 bg-grayscale-100 px-4">
      {LINKS &&
        LINKS.map(({ name, icon: Icon, handler }) => (
          <button
            key={name}
            onClick={handler}
            className="semibold-11 flex h-[3.5rem] flex-1 flex-col items-center justify-center text-center text-gray-600"
          >
            <Icon />
            <span>{name}</span>
          </button>
        ))}
    </nav>
  );
};

export default NavigationBar;
