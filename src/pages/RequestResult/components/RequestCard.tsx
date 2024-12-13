import { useState, useEffect } from "react";
import { onErrorImg } from "../../../utils/onErrorImg";
import { getNailDetail } from "../../../hooks/api/getNailDetail";
import { formatDateString } from "../../../utils/formatDateString";

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
  const requestResult =
    requestDetail.request_details[requestDetail.request_details.length - 1];

  return (
    <div className="flex w-full flex-row gap-3 border-b border-grayscale-400 py-4">
      <div className="flex flex-1 flex-col justify-between gap-1 py-1">
        <div className="flex flex-row justify-between gap-3">
          <span className="semibold-14 text-grayscale-900">
            {requestDetail && requestDetail.shop_name}
          </span>
          <span
            className={`semibold-13 ${requestResult.status === "pending" ? "text-nail-red" : "text-nail-blue"}`}
          >
            {requestDetail.request_details[
              requestDetail.request_details.length - 1
            ].status === "pending"
              ? "응답 대기중"
              : "응답 완료"}
          </span>
        </div>
        <span className="regular-13 text-grayscale-600">
          {`${formatDateString({ date: new Date(), type: "full" })} 기준`}
        </span>
        {requestResult.response && (
          <>
            <span className="semibold-13 text-red">
              {requestResult.status !== "rejected"
                ? `${requestResult.response.price}원 예상`
                : "시술 요청 거절"}
            </span>
            <span className="regular-13 text-grayscale-600">
              {requestResult.status !== "rejected"
                ? requestResult.response?.contents
                : "해당 네일아트를 시술할 수 없습니다."}
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

  return (
    <div
      className={`${isCardOpen ? "max-h-[800px]" : "max-h-[156px]"} flex w-full flex-col overflow-hidden px-4 duration-300`}
    >
      <div
        onClick={() => setIsCardOpen((prevState) => !prevState)}
        className="flex w-full cursor-pointer flex-col gap-4 border-b border-grayscale-400"
      >
        <span className="medium-18 w-full pt-4 text-grayscale-900">
          {formatDateString({
            date: new Date(
              String(
                responseData[0].request_details[
                  responseData[0].request_details.length - 1
                ].created_at,
              ),
            ),
            type: "short",
          })}
        </span>
        <div className="flex w-full flex-row gap-3 pb-4">
          <img
            src={nailDetail ? nailDetail.design_url : ""}
            onError={onErrorImg}
            className="h-20 w-20 overflow-hidden rounded-md object-cover object-center"
          />
          <div className="flex flex-1 flex-col justify-between py-1">
            <span className="semibold-13 text-grayscale-900">
              네일아트 디자인 요청
            </span>
            <span className="regular-13 text-grayscale-600">
              {nailDetail ? nailDetail.like_count : 0}명이 이 디자인을 좋아해요.
            </span>
            <span className="regular-13 text-grayscale-900">
              {responseData.length}개의 업체 중{" "}
              <span className="text-red">
                {responseData &&
                  responseData.filter(
                    (object) =>
                      object.request_details[object.request_details.length - 1]
                        .status !== "pending",
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
