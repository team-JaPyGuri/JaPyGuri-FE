import { useState, useEffect } from "react";
import { onErrorImg } from "../../../utils/onErrorImg";
import { getNailDetail } from "../../../hooks/api/getNailDetail";
import { changeImgUrl } from "../../../utils/changeImgUrl";

interface NailDetails {
  design_key: string;
  design_name: string;
  design_url: string;
  price: number;
  like_count: number;
  is_active: boolean;
}

interface RequestCardProps {
  designKey: string;
  responseData: RequestDetails[];
}

interface RequestDetails {
  request_details: {
    created_at: string;
    request: {
      price: number;
      contents: string;
    };
    request_key: string;
    response: {
      response_key: string;
      price: number;
      contents: string;
      created_at: string;
    } | null;
    status: string;
  }[];
  shop_name: string;
}

interface ResponseCardProps {
  requestDetail: RequestDetails;
}

const ResponseCard = ({ requestDetail }: ResponseCardProps) => {
  const formatFullDate = (date: Date) => {
    const yy = String(date.getFullYear());
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${yy}년 ${mm}월 ${dd}일 ${hh}시 ${min}분 기준`;
  };

  return (
    <div className="flex w-full flex-row gap-3 border-b border-grayscale-400 py-4">
      <div className="flex flex-1 flex-col justify-between gap-1 py-1">
        <div className="flex flex-row justify-between gap-3">
          <span className="semibold-14 text-grayscale-900">
            {requestDetail && requestDetail.shop_name}
          </span>
          <span
            className={`semibold-13 ${requestDetail.request_details[0].status === "pending" ? "text-nail-red" : "text-nail-blue"}`}
          >
            {requestDetail.request_details[0].status === "pending"
              ? "응답 대기중"
              : "응답 완료"}
          </span>
        </div>
        <span className="regular-13 text-grayscale-600">
          {formatFullDate(new Date())}
        </span>
        {requestDetail.request_details[0].response && (
          <>
            <span className="semibold-13 text-red">
              {requestDetail.request_details[0].response.price}원 예상
            </span>
            <span className="regular-13 text-grayscale-600">
              {requestDetail.request_details[0].response.contents}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const RequestCard = ({ designKey, responseData }: RequestCardProps) => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [nailDetail, setNailDetail] = useState<NailDetails | null>(null);

  useEffect(() => {
    const fetchNailData = async () => {
      try {
        const response = await getNailDetail(designKey);
        setNailDetail(response);
      } catch (error) {
        console.error("Error getting nail detail:", error);
      }
    };

    fetchNailData();
  }, [designKey]);

  const formatDate = (date: Date) => {
    const yy = String(date.getFullYear()).slice(-2);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    return `${yy}.${mm}.${dd}`;
  };

  return (
    <div
      className={`${isCardOpen ? "max-h-[800px]" : "max-h-[156px]"} flex w-full flex-col overflow-hidden px-4 duration-300`}
    >
      <div
        onClick={() => setIsCardOpen((prevState) => !prevState)}
        className="flex w-full cursor-pointer flex-col gap-4 border-b border-grayscale-400"
      >
        <span className="medium-18 w-full pt-4 text-grayscale-900">
          {formatDate(
            new Date(String(responseData[0].request_details[0].created_at)),
          )}
        </span>
        <div className="flex w-full flex-row gap-3 pb-4">
          <img
            src={nailDetail ? changeImgUrl(nailDetail.design_url) : ""}
            onError={onErrorImg}
            className="h-20 w-20 overflow-hidden rounded-md object-cover object-center"
          />
          <div className="flex flex-1 flex-col justify-between py-1">
            <span className="semibold-13 text-grayscale-900">
              #프렌치 #글리터
            </span>
            <span className="regular-13 text-grayscale-600">
              {nailDetail ? nailDetail.like_count : 0}명이 이 디자인을 좋아해요.
            </span>
            <span className="regular-13 text-grayscale-900">
              {responseData.length}개의 업체 중{" "}
              <span className="text-red">
                {responseData &&
                  responseData.filter(
                    (object) => object.request_details[0].status !== "pending",
                  ).length}
                곳
              </span>
              에서 응답
            </span>
          </div>
        </div>
      </div>
      {responseData &&
        responseData.map((requestData, index) => (
          <ResponseCard
            key={`${index}-${requestData.request_details[0].request_key}`}
            requestDetail={requestData}
          />
        ))}
    </div>
  );
};

export default RequestCard;
