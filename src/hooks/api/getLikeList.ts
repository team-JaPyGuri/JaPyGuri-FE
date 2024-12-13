import axios from "axios";
import { changeImgUrl } from "./../../utils/changeImgUrl";
import likeNailData from "../../../public/mock/likeNailData.json";

interface NailData {
  design_key: string;
  design_name: string;
  design_url: string;
  is_active: boolean;
  like_active: boolean;
  like_count: number;
  price: number;
}

export const getLikeList = async () => {
  if (import.meta.env.VITE_USE_MOCK_DATA === "true") return likeNailData;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NAILO_API_URL}/api/like-list/`,
      {
        headers: {
          "X-User-Type": "customer",
          "X-User-Id": "test_jpgr",
        },
      },
    );
    if (Array.isArray(response.data))
      return response.data.map((item: NailData) => ({
        ...item,
        like_active: true,
        design_url: changeImgUrl(item.design_url),
      }));
    else return null;
  } catch (error) {
    console.error("Error getting like list:", error);
    throw error;
  }
};
