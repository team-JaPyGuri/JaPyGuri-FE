import { useCallback } from "react";
import Coordinates from "../../types/Coordinates";

export const useFetchCurrentLocation = (
  setCenterCoords: (coords: Coordinates) => void,
  showToast: (options: { message: string }) => void,
  mapInstanceRef: React.MutableRefObject<naver.maps.Map | null>,
) => {
  const fetchCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenterCoords({ latitude, longitude });
        mapInstanceRef.current?.setCenter(
          new window.naver.maps.LatLng(latitude, longitude),
        );
      },
      (error) => {
        console.error("Error getting current location:", error);
        navigator.permissions
          .query({ name: "geolocation" as PermissionName })
          .then((permissionStatus) => {
            if (permissionStatus.state === "denied") {
              showToast({
                message: "위치 권한이 거부되었어요. 위치 권한을 허용해주세요.",
              });
            }
          });
      },
    );
  }, [setCenterCoords, showToast, mapInstanceRef]);

  return { fetchCurrentLocation };
};
