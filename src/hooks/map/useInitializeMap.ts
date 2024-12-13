import { useRef, useCallback } from "react";
import Coordinates from "../../types/Coordinates";

export const useInitializeMap = (initialCoords: Coordinates) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  const initializeMap = useCallback(() => {
    if (!mapContainerRef.current) return;

    mapInstanceRef.current = new naver.maps.Map(mapContainerRef.current, {
      center: new window.naver.maps.LatLng(
        initialCoords.latitude,
        initialCoords.longitude,
      ),
      zoom: 15,
      mapDataControl: false,
      logoControl: false,
      scaleControl: false,
      disableKineticPan: false,
    });
  }, [initialCoords]);

  return { mapContainerRef, mapInstanceRef, initializeMap };
};
