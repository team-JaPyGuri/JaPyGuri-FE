import React from "react";
import { useState } from "react";
import ArrowDownIcon from "../../../assets/svgs/arrowDown.svg?react";
import { stopPropagation } from "../../../utils/stopPropagation";

interface ToggleHeaderProps {
  title: string;
  sortType: "byDate" | "byPopularity";
  setSortType: React.Dispatch<React.SetStateAction<"byDate" | "byPopularity">>;
}

const ToggleHeader = ({ title, sortType, setSortType }: ToggleHeaderProps) => {
  const [toggleActive, setToggleActive] = useState(false);

  const byDateButtonHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    setSortType("byDate");
    setToggleActive(false);
  };

  const byPopularityButtonHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    setSortType("byPopularity");
    setToggleActive(false);
  };

  const dimmerClickedHandler = (event: React.MouseEvent) => {
    stopPropagation(event);
    setToggleActive(false);
  };

  return (
    <div className="flex w-full flex-row justify-between px-4 py-3">
      <span className="medium-13 text-grayscale-600">{title}</span>
      <button
        onClick={() => setToggleActive(!toggleActive)}
        className="regular-13 relative flex flex-row items-center text-grayscale-600"
      >
        {sortType === "byDate" ? "등록순" : "인기순"}
        <ArrowDownIcon
          className={`${toggleActive && "rotate-180"} duration-300`}
        />
        {toggleActive && (
          <div
            onClick={(event) => dimmerClickedHandler(event)}
            className="fixed left-1/2 top-0 flex h-full w-full min-w-[20rem] max-w-[37.5rem] -translate-x-1/2 overflow-hidden"
          />
        )}
        <div
          className={`absolute right-0 top-6 flex w-28 flex-col rounded-md border border-grayscale-400 bg-grayscale-100 py-1 ${toggleActive ? "z-10 animate-fadeIn" : "-z-10 animate-fadeOut"}`}
        >
          <div
            onClick={(event) => byDateButtonHandler(event)}
            className={`${sortType === "byDate" ? "text-grayscale-900" : "text-grayscale-600"} regular-13 w-full px-4 py-2 text-left`}
          >
            등록순
          </div>
          <div
            onClick={(event) => byPopularityButtonHandler(event)}
            className={`${sortType !== "byDate" ? "text-grayscale-900" : "text-grayscale-600"} regular-13 w-full px-4 py-2 text-left`}
          >
            인기순
          </div>
        </div>
      </button>
    </div>
  );
};

export default ToggleHeader;
