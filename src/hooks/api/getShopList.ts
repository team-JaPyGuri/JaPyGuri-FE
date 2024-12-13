import axios from "axios";
import shopData from "../../../public/mock/shopData.json";

export const getShopList = async () => {
  if (import.meta.env.VITE_USE_MOCK_DATA === "true") return shopData;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NAILO_API_URL}/api/shops/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error getting shop list:", error);
    throw error;
  }
};
