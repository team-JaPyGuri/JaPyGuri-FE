// toastAtom.ts
import { atom } from "recoil";

interface RequestResultData {
  design_key: string;
  design_name: string;
  shop_requests: RequestDetails[];
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

export const stateRequestResult = atom<RequestResultData[] | null>({
  key: "stateRequestResult",
  default: null,
});
