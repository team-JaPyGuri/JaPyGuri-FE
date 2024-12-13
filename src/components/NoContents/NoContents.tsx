import NoContentIcon from "../../assets/svgs/noContent.svg?react";

interface NoContentsProps {
  title: string;
  subtitle: string;
  className?: string;
}

const NoContents = ({ title, subtitle, className }: NoContentsProps) => {
  return (
    <div
      className={`${className} flex w-full flex-col items-center justify-center gap-2 px-4 pb-6 pt-14`}
    >
      <NoContentIcon />
      <div className="flex flex-col justify-center text-center">
        <span className="semibold-13 text-grayscale-600">{title}</span>
        <span className="regular-13 text-grayscale-600">{subtitle}</span>
      </div>
    </div>
  );
};

export default NoContents;
