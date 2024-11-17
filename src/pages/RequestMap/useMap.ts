import { useRef, useCallback } from "react";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export const useMap = (
  initialCoords: Coordinates,
  setCenterCoords: (coords: Coordinates) => void,
  showToast: (options: { message: string }) => void,
) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const isMapInitialized = useRef(false);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current) return;

    const mapOptions = {
      center: new window.naver.maps.LatLng(
        initialCoords.latitude,
        initialCoords.longitude,
      ),
      zoom: 15,
      mapDataControl: false,
      logoControl: false,
      scaleControl: false,
      disableKineticPan: false,
    };

    mapInstanceRef.current = new window.naver.maps.Map(
      mapContainerRef.current,
      mapOptions,
    );

    isMapInitialized.current = true;
  }, [initialCoords]);

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
  }, [setCenterCoords, showToast]);

  const setupMapEvents = useCallback(() => {
    if (!mapInstanceRef.current) return;

    window.naver.maps.Event.addListener(
      mapInstanceRef.current,
      "dragend",
      () => {
        const currentCenter = mapInstanceRef.current?.getCenter();
        if (currentCenter) {
          setCenterCoords({
            latitude: currentCenter.y,
            longitude: currentCenter.x,
          });
        }
      },
    );
  }, [setCenterCoords]);

  return {
    mapContainerRef,
    initializeMap,
    fetchCurrentLocation,
    setupMapEvents,
  };
};
