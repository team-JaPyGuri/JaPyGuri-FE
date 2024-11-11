import ReactDOM from "react-dom";
import { useRecoilValue } from "recoil";
import { toastListState } from "../../stores/stateToast";
import usePortal from "../../utils/usePortal";

interface ToastProps {
  toastKey: number;
  message: string;
  link?: string;
}

const Toast = ({ toastKey, message, link }: ToastProps) => {
  return (
    <div
      key={toastKey}
      className="z-50 w-full px-4 flex flex-row justify-between items-center rounded-[0.25rem] h-11 regular-13 text-grayscale-100 bg-grayscale-700"
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

  return portalRoot
    ? ReactDOM.createPortal(
        <div className="fixed w-full min-w-[20rem] max-w-[37.5rem] bottom-14 left-1/2 -translate-x-1/2 space-y-3 px-4 py-3">
          {toastList.map((toast) => (
            <Toast
              key={toast.id}
              toastKey={toast.id}
              message={toast.message}
              link={toast.link}
            />
          ))}
        </div>,
        portalRoot
      )
    : null;
};

export default ToastContainer;
