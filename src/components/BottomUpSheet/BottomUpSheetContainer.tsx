import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bottomUpSheetState } from "../../stores/stateBottomUpSheet";
import usePortal from "../../utils/usePortal";
import CancelIcon from "../../assets/svgs/cancel.svg?react";
import { stopPropagation } from "../../utils/stopPropagation";
import { useLocation } from "react-router-dom";

interface BottomUpSheetProps {
  title: string;
  content: JSX.Element | null;
  className?: string;
}

const BottomUpSheet = ({ title, content, className }: BottomUpSheetProps) => {
  const setBottomUpSheet = useSetRecoilState(bottomUpSheetState);

  return (
    <div
      onClick={stopPropagation}
      className={`${className} flex w-full flex-col items-center justify-center rounded-t-lg border-x border-t border-grayscale-300 bg-grayscale-100 pb-2`}
    >
      <div className="flex w-full flex-col items-center justify-start py-2">
        <div className="h-1 w-9 rounded-sm bg-grayscale-400" />
      </div>
      <div className="flex w-full flex-row justify-between border-b border-gray-300 px-4 py-2">
        <span className="medium-16 text-grayscale-900">{title}</span>
        <button
          onClick={() =>
            setBottomUpSheet((oldBottomUpSheetState) => ({
              ...oldBottomUpSheetState,
              visible: false,
            }))
          }
        >
          <CancelIcon />
        </button>
      </div>
      {content}
    </div>
  );
};

const BottomUpSheetContainer = () => {
  const setBottomUpSheet = useSetRecoilState(bottomUpSheetState);
  const bottomUpSheetContent = useRecoilValue(bottomUpSheetState);
  const body = document.documentElement;
  const portalRoot = usePortal("bottom-up-sheet-portal");
  const location = useLocation();

  const [showZIndex, setShowZIndex] = useState(bottomUpSheetContent.visible);

  useEffect(() => {
    if (bottomUpSheetContent.visible) {
      setShowZIndex(true);
      const currentPosition = window.scrollY;
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${currentPosition}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      const savedScrollPosition = parseInt(body.style.top || "0", 10) * -1;
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      window.scrollTo(0, savedScrollPosition);
      const timeout = setTimeout(() => {
        setShowZIndex(false);
        setBottomUpSheet((oldBottomUpSheetState) => ({
          ...oldBottomUpSheetState,
          content: null,
        }));
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [setBottomUpSheet, bottomUpSheetContent.visible, body]);

  useEffect(() => {
    setBottomUpSheet((oldBottomUpSheetState) => ({
      ...oldBottomUpSheetState,
      visible: false,
    }));
  }, [location, setBottomUpSheet]);

  return portalRoot
    ? ReactDOM.createPortal(
        <div
          onClick={() =>
            setBottomUpSheet((oldBottomUpSheetState) => ({
              ...oldBottomUpSheetState,
              visible: false,
            }))
          }
          className={`fixed bottom-0 left-1/2 flex h-full w-full min-w-[20rem] max-w-[37.5rem] -translate-x-1/2 flex-col justify-end overflow-hidden bg-grayscale-900 bg-opacity-60 transition-opacity duration-300 ${
            bottomUpSheetContent.visible ? "animate-fadeIn" : "animate-fadeOut"
          } ${showZIndex ? "!z-20" : "!-z-10"}`}
        >
          <BottomUpSheet
            title={bottomUpSheetContent.title}
            content={bottomUpSheetContent.content}
            className={
              bottomUpSheetContent.visible
                ? "animate-slideIn"
                : "animate-slideOut"
            }
          />
        </div>,
        portalRoot,
      )
    : null;
};

export default BottomUpSheetContainer;
