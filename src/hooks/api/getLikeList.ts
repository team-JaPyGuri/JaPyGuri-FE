import axios from "axios";
import { changeImgUrl } from "./../../utils/changeImgUrl";

interface NailData {
  design_key: string;
  design_url: string;
  is_active: boolean;
  like_active: boolean;
  price: string;
  like_count: number;
}

export const getLikeList = async () => {
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
