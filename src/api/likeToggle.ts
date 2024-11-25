import axios from "axios";

export const toggleLike = async (id: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_NAILO_API_URL}/api/like-toggle/${id}/`,
    );
    return response.data.result;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
