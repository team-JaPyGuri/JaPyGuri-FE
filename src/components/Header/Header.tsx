import { ReactNode, useEffect, useState } from "react";
import UserIcon from "../../assets/svgs/user.svg?react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className={`sticky top-0 z-10 flex w-full min-w-[20rem] max-w-[37.5rem] flex-row transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-[3.875rem]"}`}
    >
      <div className="flex w-full flex-row justify-between bg-grayscale-800 py-2 pl-2 pr-4 align-middle">
        <button className="semibold-20 p-2 text-grayscale-100">NAILO</button>
        <button>
          <UserIcon />
        </button>
      </div>
      {children}
    </header>
  );
};

export default Header;
