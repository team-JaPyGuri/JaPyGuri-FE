import CategoryIcon from "../../assets/svgs/category.svg?react";
import AiIcon from "../../assets/svgs/ai.svg?react";
import HomeIcon from "../../assets/svgs/home.svg?react";
import LikeIcon from "../../assets/svgs/like.svg?react";
import RequestIcon from "../../assets/svgs/request.svg?react";

const NavigationBar = () => {
  const LINKS = [
    {
      name: "카테고리",
      icon: CategoryIcon,
      href: "/category",
    },
    {
      name: "AI 피팅",
      icon: AiIcon,
      href: "/ai",
    },
    {
      name: "홈",
      icon: HomeIcon,
      href: "/",
    },
    {
      name: "좋아요",
      icon: LikeIcon,
      href: "/like",
    },
    {
      name: "샵 요청",
      icon: RequestIcon,
      href: "/request",
    },
  ];

  return (
    <nav className="w-full fixed bottom-0 px-4 flex flex-row gap-3 bg-grayscale-100 border-t border-gray-300">
      {LINKS &&
        LINKS.map(({ name, icon: Icon, href }) => (
          <a
            key={name}
            href={href}
            className="h-[3.5rem] flex flex-col items-center justify-center flex-1 semibold-11 text-center text-gray-500"
          >
            <Icon />
            <span>{name}</span>
          </a>
        ))}
    </nav>
  );
};

export default NavigationBar;
