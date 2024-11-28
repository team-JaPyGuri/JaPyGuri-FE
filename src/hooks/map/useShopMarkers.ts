import { useCallback } from "react";
import { getShopList } from "../api/getShopList";
import { reverseGeocode } from "./reverseGeocode";
import MarkerInfo from "../../types/MarkerInfo";

export const useShopMarkers = ({
  mapInstanceRef,
  markersRef,
  markersInfo,
  setCurrentShop,
}: {
  mapInstanceRef: React.MutableRefObject<naver.maps.Map | null>;
  markersRef: React.MutableRefObject<naver.maps.Marker[]>;
  markersInfo: React.MutableRefObject<Record<string, MarkerInfo>>;
  setCurrentShop: React.Dispatch<React.SetStateAction<MarkerInfo | null>>;
}) => {
  const shopMarkers = useCallback(async () => {
    const res = await getShopList();
    for (const { shop_id, shop_key, shop_name, shop_url, lat, lng } of res) {
      const marker = new naver.maps.Marker({
        map: mapInstanceRef.current ?? undefined,
        position: new naver.maps.LatLng(+lat, +lng),
        title: shop_key,
        zIndex: 10,
      });
      markersRef.current.push(marker);

      const address = await reverseGeocode(+lat, +lng);
      markersInfo.current[shop_key] = {
        shop_id,
        shop_key,
        shop_name,
        shop_url,
        address: address !== null ? address : "주소가 존재하지 않아요.",
      };

      naver.maps.Event.addListener(marker, "click", () => {
        setCurrentShop(markersInfo.current[shop_key]);
      });
    }
  }, [mapInstanceRef, markersRef, markersInfo, setCurrentShop]);

  return { shopMarkers };
};
