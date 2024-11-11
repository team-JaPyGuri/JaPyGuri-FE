import { useToast } from "../../../components/Toast/useToast";

interface SubTitleProps {
  title: string;
  className?: string;
}

const SubTitle = ({ title, className }: SubTitleProps) => {
  const showToast = useToast();

  return (
    <div
      className={`${className} flex w-full flex-row justify-between px-4 py-3`}
    >
      <h2 className="medium-18 text-grayscale=900">{title}</h2>
      <button
        className="regular-13 text-grayscale-600 underline"
        onClick={() =>
          showToast({ message: "데모 버전 제공 불가 기능입니다." })
        }
      >
        더보기
      </button>
    </div>
  );
};

export default SubTitle;
