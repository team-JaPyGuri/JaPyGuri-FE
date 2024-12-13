import axios from "axios";
import { base64ToBlob } from "../../utils/base64ToBlob";

export const postTryOn = async (id: string, capturedImage: string) => {
  if (import.meta.env.VITE_USE_MOCK_DATA === "true") return;
  try {
    const imageBlob = base64ToBlob(capturedImage, "image/png");

    const imageFile = new File([imageBlob], "capturedImage.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("design_key", id);

    axios.post(`${import.meta.env.VITE_NAILO_API_URL}/api/try-on/`, formData, {
      headers: {
        "X-User-Type": "customer",
        "X-User-Id": "test_jpgr",
      },
    });
  } catch (error) {
    console.error("Error posting try-on request:", error);
    throw error;
  }
};
