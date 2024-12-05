import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import SubHeader from "../../components/Header/SubHeader";
import Button from "../../components/Button/Button";
import { useToast } from "../../components/Toast/useToast";
import { useBottomUpSheet } from "../../components/BottomUpSheet/useBottomUpSheet";
import CameraResult from "../../components/BottomUpSheet/components/CameraResult";

import ChangeCameraIcon from "../../assets/svgs/changeCamera.svg?react";
import NoCamera from "./components/NoCamera";

const Camera = () => {
  const showToast = useToast();
  const showBottomUpSheet = useBottomUpSheet();
  const { designId } = useParams();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment",
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 720 },
            height: { ideal: 720 },
            facingMode: facingMode,
          },
        });
        if (videoRef.current && backgroundVideoRef.current) {
          videoRef.current.srcObject = backgroundVideoRef.current.srcObject =
            stream;
          setIsCameraOn(true);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setIsCameraOn(false);
        showToast({
          message: "카메라 권한이 거부되었어요. 카메라 권한을 허용해주세요.",
        });
      }
    };

    initCamera();

    const currentVideo = videoRef.current;
    const currentBackgroundVideo = backgroundVideoRef.current;

    return () => {
      if (
        currentVideo &&
        currentBackgroundVideo &&
        currentVideo.srcObject &&
        currentBackgroundVideo.srcObject
      ) {
        const tracks = [
          ...(currentVideo.srcObject as MediaStream).getTracks(),
          ...(currentBackgroundVideo.srcObject as MediaStream).getTracks(),
        ];
        tracks.forEach((track) => track.stop());
      }
    };
  }, [showToast, facingMode]);

  useEffect(() => {
    if (capturedImage === null) return;
    if (designId === undefined) return;
    showBottomUpSheet({
      title: "촬영 결과",
      content: <CameraResult id={designId} img={capturedImage} />,
    });
  }, [designId, showBottomUpSheet, capturedImage]);

  const toggleCamera = () => {
    setFacingMode((prev) => {
      showToast({
        message:
          prev === "user"
            ? "후면 카메라로 전환했어요."
            : "전면 카메라로 전환했어요.",
      });
      return prev === "user" ? "environment" : "user";
    });
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setCapturedImage(imageData);
        showToast({ message: "사진이 촬영되었어요." });
      }
    }
  };

  return (
    <Layout>
      <SubHeader title="네일아트 AI 피팅" />
      <div className="flex w-full flex-row justify-start px-4 py-2">
        <span className="medium-13">
          AI 피팅을 체험할 손 사진을 촬영해주세요.
          <br />흰 배경에 손의 윤곽이 잘 나오도록 촬영해주세요.
        </span>
      </div>
      <div className="relative flex w-full flex-1 flex-col justify-center">
        <NoCamera />
        <div className="absolute inset-0 h-full w-full">
          <video
            ref={backgroundVideoRef}
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 h-full w-full backdrop-blur-2xl" />
        </div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute aspect-square w-full object-cover"
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className="flex w-full flex-row gap-3 px-4 py-3 pb-5">
        <Button
          className={`${isCameraOn || "!bg-grayscale-500"}`}
          onClick={takePhoto}
        >
          사진 촬영하기
        </Button>
        <Button
          className={`${isCameraOn || "!bg-grayscale-500"} !w-fit`}
          onClick={toggleCamera}
        >
          <ChangeCameraIcon />
        </Button>
      </div>
    </Layout>
  );
};

export default Camera;
