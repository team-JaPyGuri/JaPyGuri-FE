import axios from "axios";

export const getNailDetail = async (design_key: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NAILO_API_URL}/api/nail-design/${design_key}/`,
    );
    if (response.data) return response.data;
    else return null;
  } catch (error) {
    console.error("Error getting like list:", error);
    throw error;
  }
};
