import { useCallback } from "react";
import Coordinates from "../../types/Coordinates";

export const useSetupMapEvents = (
  mapInstanceRef: React.MutableRefObject<naver.maps.Map | null>,
  setCenterCoords: (coords: Coordinates) => void,
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>,
  markersRef: React.MutableRefObject<naver.maps.Marker[]>,
  setActiveMarker: React.Dispatch<React.SetStateAction<naver.maps.Marker[]>>,
) => {
  const setupMapEvents = useCallback(() => {
    if (!mapInstanceRef.current) return;

    window.naver.maps.Event.addListener(mapInstanceRef.current, "idle", () => {
      const currentCenter = mapInstanceRef.current?.getCenter();
      if (currentCenter) {
        setCenterCoords({
          latitude: currentCenter.y,
          longitude: currentCenter.x,
        });

        naver.maps.Service.reverseGeocode(
          {
            coords: new naver.maps.LatLng(currentCenter.y, currentCenter.x),
            orders: [naver.maps.Service.OrderType.ADDR].join(","),
          },
          (status, response) => {
            setCurrentAddress(
              status === naver.maps.Service.Status.OK
                ? response.v2.address.jibunAddress
                : "주소가 존재하지 않아요.",
            );
          },
        );
      }

      const map = mapInstanceRef.current;
      const bounds = map?.getBounds();
      if (!bounds) return;

      const visibleMarkers = markersRef.current.filter((marker) =>
        bounds.hasPoint(marker.getPosition()),
      );

      visibleMarkers.forEach((marker) => marker.setMap(map));
      markersRef.current
        .filter((marker) => !visibleMarkers.includes(marker))
        .forEach((marker) => marker.setMap(null));

      setActiveMarker(visibleMarkers);
    });
  }, [
    mapInstanceRef,
    setCenterCoords,
    setCurrentAddress,
    markersRef,
    setActiveMarker,
  ]);

  return { setupMapEvents };
};
