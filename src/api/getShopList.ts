import axios from "axios";

export const getShopList = async () => {
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
