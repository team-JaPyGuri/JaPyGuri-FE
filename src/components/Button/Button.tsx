import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`regular-14 flex h-11 w-full flex-row items-center justify-center rounded-[0.25rem] bg-grayscale-900 px-4 text-grayscale-100 duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
