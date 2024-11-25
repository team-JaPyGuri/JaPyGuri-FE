import ReactDOM from "react-dom";
import { useRecoilValue } from "recoil";
import { toastListState } from "../../stores/stateToast";
import usePortal from "../../utils/usePortal";
import { useEffect, useState } from "react";

interface ToastProps {
  toastKey: number;
  message: string;
  link?: string;
}

const Toast = ({ toastKey, message, link }: ToastProps) => {
  const [animation, setAnimation] = useState("fadeIn");

  useEffect(() => {
    const timer = setTimeout(() => setAnimation("fadeOut"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      key={toastKey}
      className={`regular-13 flex h-11 w-full flex-row items-center justify-between rounded-[0.25rem] bg-grayscale-700 px-4 text-grayscale-100 animate-${animation}`}
    >
      {message}
      {link && (
        <a target="_blank" href={link} className="underline">
          바로가기
        </a>
      )}
    </div>
  );
};

const ToastContainer = () => {
  const toastList = useRecoilValue(toastListState);
  const portalRoot = usePortal("toast-portal");

  const [showZIndex, setShowZIndex] = useState(toastList.length > 0);

  useEffect(() => {
    if (toastList.length > 0) {
      setShowZIndex(true);
    } else {
      const timeout = setTimeout(() => setShowZIndex(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [toastList]);

  return portalRoot
    ? ReactDOM.createPortal(
        <div
          className={`fixed left-1/2 top-16 flex w-full min-w-[20rem] max-w-[37.5rem] -translate-x-1/2 flex-col justify-start space-y-3 px-4 py-3 ${showZIndex ? "!z-20" : "!-z-10"}`}
        >
          {toastList.map((toast) => (
            <Toast
              key={toast.id}
              toastKey={toast.id}
              message={toast.message}
              link={toast.link}
            />
          ))}
        </div>,
        portalRoot,
      )
    : null;
};

export default ToastContainer;
