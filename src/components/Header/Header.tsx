import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/svgs/user.svg?react";
import { useToast } from "../Toast/useToast";

interface HeaderProps {
  subTitle?: string;
  children?: ReactNode;
}

const Header = ({ subTitle, children }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const showToast = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky top-0 z-10 flex w-full min-w-[20rem] max-w-[37.5rem] flex-col transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-[3.875rem]"}`}
    >
      <div className="flex w-full flex-row justify-between bg-grayscale-800 py-2 pl-2 pr-4 align-middle">
        <button
          onClick={() => navigate("/")}
          className="semibold-20 p-2 text-grayscale-100"
        >
          NAILO
        </button>
        <button
          onClick={() =>
            showToast({
              message: "데모 버전에서는 해당 기능을 제공할 수 없어요.",
            })
          }
        >
          <UserIcon />
        </button>
      </div>
      {subTitle && (
        <div className="semibold-14 flex h-12 w-full items-center justify-start bg-grayscale-800 px-4 text-grayscale-100">
          {subTitle}
        </div>
      )}
      {children}
    </header>
  );
};

export default Header;
