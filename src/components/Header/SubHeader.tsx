import BackIcon from "../../assets/svgs/back.svg?react";

interface SubHeaderProps {
  title: string;
}

const SubHeader = ({ title }: SubHeaderProps) => {
  return (
    <header className="top-0 z-10 flex w-full min-w-[20rem] max-w-[37.5rem] flex-row">
      <div className="flex w-full flex-row items-center justify-start gap-2 bg-grayscale-200 p-4">
        <button>
          <BackIcon />
        </button>
        <h1 className="semibold-14 text-grayscale-900">{title}</h1>
      </div>
    </header>
  );
};

export default SubHeader;
