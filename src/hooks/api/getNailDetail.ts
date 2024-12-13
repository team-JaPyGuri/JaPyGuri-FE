import axios from "axios";
import allNailData from "../../../public/mock/allNailData.json";
import { changeImgUrl } from "../../utils/changeImgUrl";

export const getNailDetail = async (design_key: string) => {
  if (import.meta.env.VITE_USE_MOCK_DATA === "true") {
    return allNailData.find((item) => item.design_key === design_key);
  }
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NAILO_API_URL}/api/nail-design/${design_key}/`,
    );
    if (response.data)
      return {
        ...response.data,
        design_url: changeImgUrl(response.data.design_url),
      };
    else return null;
  } catch (error) {
    console.error("Error getting like list:", error);
    throw error;
  }
};
