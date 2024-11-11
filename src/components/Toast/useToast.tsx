import { useSetRecoilState } from "recoil";
import { toastListState } from "../../stores/stateToast";

interface UseToastProps {
  message: string;
  link?: string;
}

interface ToastMessage {
  id: number;
  message: string;
  link?: string;
}

export const useToast = () => {
  const setToastList = useSetRecoilState(toastListState);

  const showToast = ({ message, link }: UseToastProps) => {
    const newToast: ToastMessage = { id: Date.now(), message, link };

    setToastList((oldToastList) => [...oldToastList, newToast]);

    setTimeout(() => {
      setToastList((currentList) =>
        currentList.filter((toast) => toast.id !== newToast.id)
      );
    }, 3000);
  };

  return showToast;
};
