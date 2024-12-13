// toastAtom.ts
import { atom } from "recoil";

interface RequestResultData {
  request_key: string;
  customer_name: string;
  design_name: string;
  status: string;
  created_at: string;
  price: number;
  contents: string;
}

export const stateRequestList = atom<RequestResultData[] | null>({
  key: "stateRequestList",
  default: null,
});
