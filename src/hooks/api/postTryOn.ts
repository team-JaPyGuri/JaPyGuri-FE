import axios from "axios";
import { base64ToBlob } from "../../utils/base64toBlob";

export const postTryOn = async (id: string, capturedImage: string) => {
  try {
    const imageBlob = base64ToBlob(capturedImage, "image/png");

    // Blob -> 다운로드 처리
    const url = window.URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "yeah"); // 다운로드할 파일 이름
    document.body.appendChild(link);
    link.click(); // 다운로드 트리거
    document.body.removeChild(link); // 링크 제거

    const imageFile = new File([imageBlob], "capturedImage.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `${import.meta.env.VITE_NAILO_API_URL}/api/try-on/`,
      formData,
      {
        headers: {
          "X-User-Type": "customer",
          "X-User-Id": "test_jpgr",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error posting try-on request:", error);
    throw error;
  }
};
