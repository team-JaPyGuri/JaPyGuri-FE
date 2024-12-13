import CameraIcon from "../../../assets/svgs/camera.svg?react";

const NoCamera = () => {
  return (
    <div className="absolute flex w-full flex-col items-center justify-center gap-2 px-4">
      <CameraIcon />
      <div className="flex flex-col justify-center text-center">
        <span className="semibold-13 text-grayscale-600">
          카메라 권한을 허용해주세요.
        </span>
        <span className="regular-13 text-grayscale-600">
          브라우저 설정에서 카메라 권한을 허용해주세요.
        </span>
      </div>
    </div>
  );
};

export default NoCamera;
