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
      className={`w-full min-w-[20rem] max-w-[37.5rem] flex flex-row transition-transform duration-300 sticky top-0 ${isVisible ? "translate-y-0" : "-translate-y-[3.875rem]"}`}
    >
      <div className="w-full pl-2 pr-4 py-2 flex flex-row justify-between align-middle bg-grayscale-800">
        <button className="semibold-20 text-grayscale-100 p-2">NAILO</button>
        <button>
          <UserIcon />
        </button>
      </div>
      {children}
    </header>
  );
};

export default Header;
