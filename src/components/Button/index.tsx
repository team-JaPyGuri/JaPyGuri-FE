import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="w-full h-11 px-4 flex flex-row justify-center items-center regular-14 rounded-[0.25rem] text-grayscale-100 bg-grayscale-900">
      {children}
    </button>
  );
};

export default Button;
