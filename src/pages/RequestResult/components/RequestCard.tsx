import { useState } from "react";
import { onErrorImg } from "../../../utils/onErrorImg";

const ResponseCard = () => {
  return (
    <div className="flex w-full flex-row gap-3 border-b border-grayscale-400 py-4">
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex flex-row justify-between gap-3">
          <span className="semibold-13 text-grayscale-900">강남 쁘띠네일</span>
          <span className="semibold-13 text-yellow">★ 별점 미제공</span>
        </div>
        <span className="regular-13 text-grayscale-600">
          서울특별시 강남구 강남대로 지하396
        </span>
        <span className="semibold-13 text-red">약 50,000원 예상</span>
      </div>
      <img
        src=""
        onError={onErrorImg}
        className="h-20 w-20 overflow-hidden rounded-md object-cover object-center"
      />
    </div>
  );
};

const RequestCard = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div
      className={`${isCardOpen ? "max-h-[800px]" : "max-h-[156px]"} flex w-full flex-col overflow-hidden px-4 duration-300`}
    >
      <div
        onClick={() => setIsCardOpen((prevState) => !prevState)}
        className="flex w-full cursor-pointer flex-col gap-4 border-b border-grayscale-400"
      >
        <span className="medium-18 w-full pt-4 text-grayscale-900">
          24.11.10
        </span>
        <div className="flex w-full flex-row gap-3 pb-4">
          <img
            src=""
            onError={onErrorImg}
            className="h-20 w-20 overflow-hidden rounded-md object-cover object-center"
          />
          <div className="flex flex-1 flex-col justify-between py-1">
            <span className="semibold-13 text-grayscale-900">
              #프렌치 #글리터
            </span>
            <span className="regular-13 text-grayscale-600">
              서울특별시 강남구 강남대로 지하396
            </span>
            <span className="regular-13 text-grayscale-900">
              24개의 업체 중 <span className="text-red">12곳</span>에서 응답
            </span>
          </div>
        </div>
      </div>
      <ResponseCard />
      <ResponseCard />
      <ResponseCard />
    </div>
  );
};

export default RequestCard;
