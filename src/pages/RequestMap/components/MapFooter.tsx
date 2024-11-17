import Button from "../../../components/Button/Button";

interface MapFooterProps {
  currentAddress: string;
  className?: string;
}

const MapFooter = ({ currentAddress, className }: MapFooterProps) => {
  return (
    <div
      className={`${className} flex w-full flex-col items-center justify-center rounded-t-lg border-x border-t border-grayscale-300 bg-grayscale-100`}
    >
      <div className="flex w-full flex-col items-center justify-start py-2">
        <div className="h-1 w-9 rounded-sm bg-grayscale-400" />
      </div>
      <div className="flex w-full flex-col justify-between gap-2 border-b border-gray-300 px-6 py-3">
        <span className="semibold-16 text-grayscale-900">현재 위치</span>
        <span className="regular-13 text-grayscale-600">{currentAddress}</span>
        <span className="semibold-13 text-grayscale-900">Temp Text</span>
      </div>
      <div className="w-full px-4 py-3">
        <Button>네일아트 요청하기</Button>
      </div>
    </div>
  );
};

export default MapFooter;
