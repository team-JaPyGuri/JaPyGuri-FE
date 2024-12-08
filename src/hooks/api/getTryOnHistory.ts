import axios from "axios";

export const getTryOnHistory = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_NAILO_API_URL}/api/try-on-history/`,
      {
        headers: {
          "X-User-Type": "customer",
          "X-User-Id": "test_jpgr",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error getting try-on-history request:", error);
    throw error;
  }
};
