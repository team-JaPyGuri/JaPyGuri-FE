import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="w-full h-11 px-4 flex flex-row justify-center items-center regular-14 rounded-[0.25rem] text-grayscale-100 bg-grayscale-900"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
