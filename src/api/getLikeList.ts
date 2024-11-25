import axios from "axios";

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
    return response.data;
  } catch (error) {
    console.error("Error getting like list:", error);
    throw error;
  }
};
