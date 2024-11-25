import SubHeader from "../../components/Header/SubHeader";
import Layout from "../../components/Layout/Layout";
import MainPinIcon from "../../assets/svgs/mainPin.svg?react";
import MapFooter from "./components/MapFooter";

import { useRef, useEffect, useState } from "react";
import { useToast } from "../../components/Toast/useToast";
import { useMap } from "./useMap";
import { getShopList } from "../../api/getShopList";
import ShopInfo from "./components/ShopInfo";
import { getAddressFromCoords } from "./../../api/getAddressFromCoords";

interface MarkerInfo {
  shop_id: number;
  shop_key: string;
  shop_name: string;
  shop_url: string;
  address: string;
}

const RequestMap = () => {
  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markersInfo = useRef<Record<string, MarkerInfo>>({});

  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [currentShop, setCurrentShop] = useState<MarkerInfo | null>(null);
  const showToast = useToast();

  const [currentAddress, setCurrentAddress] = useState<string>("-");
  const [activeMarkerCount, setActiveMarkerCount] = useState<number>(0);
  const [centerCoords, setCenterCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.5665,
    longitude: 126.978,
  });

  const {
    mapContainerRef,
    mapInstanceRef,
    initializeMap,
    fetchCurrentLocation,
    setupMapEvents,
  } = useMap(centerCoords, setCenterCoords, showToast);

  useEffect(() => {
    if (!isMapInitialized) {
      console.error("Map instance is not initialized.");
      return;
    }

    const updateMarkers = (
      map: naver.maps.Map | undefined,
      markers: naver.maps.Marker[],
    ) => {
      if (!map) {
        console.error("Map instance is not available.");
        return;
      }

      const mapBounds = map.getBounds();
      if (!mapBounds) {
        console.error("Failed to get map bounds.");
        return;
      }

      markers.forEach((marker) => {
        try {
          const position = marker.getPosition();
          if (mapBounds.hasPoint(position)) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        } catch (error) {
          console.error("Error updating marker:", error);
        }
      });
    };

    const MoveEventListener = naver.maps.Event.addListener(
      mapInstanceRef.current,
      "idle",
      () => {
        updateMarkers(mapInstanceRef.current, markersRef.current);
        setActiveMarkerCount(
          markersRef.current.filter((marker) => marker.getMap() !== null)
            .length,
        );
      },
    );

    return () => {
      naver.maps.Event.removeListener(MoveEventListener);
    };
  }, [mapInstanceRef, isMapInitialized]);

  useEffect(() => {
    if (mapContainerRef.current) {
      setCurrentShop(null);
      naver.maps.Service.reverseGeocode(
        {
          coords: new naver.maps.LatLng(
            centerCoords.latitude,
            centerCoords.longitude,
          ),
          orders: [naver.maps.Service.OrderType.ADDR].join(","),
        },
        (status, response) => {
          if (status !== naver.maps.Service.Status.OK)
            setCurrentAddress("주소가 존재하지 않아요.");
          else setCurrentAddress(response.v2.address.jibunAddress);
        },
      );
    }
  }, [centerCoords, mapContainerRef]);

  useEffect(() => {
    if (!isMapInitialized) {
      initializeMap();
      fetchCurrentLocation();
      setupMapEvents();

      const fetchShopList = async () => {
        const res = await getShopList();
        for (const {
          shop_id,
          shop_key,
          shop_name,
          shop_url,
          lat,
          lng,
        } of res) {
          const marker = new naver.maps.Marker({
            map: mapInstanceRef.current,
            position: new naver.maps.LatLng(+lat, +lng),
            title: shop_key,
            zIndex: 10,
          });
          markersRef.current.push(marker);

          const address = await getAddressFromCoords(+lat, +lng);

          markersInfo.current[shop_key] = {
            shop_id,
            shop_key,
            shop_name,
            shop_url,
            address,
          };

          naver.maps.Event.addListener(marker, "click", () => {
            setCurrentShop(markersInfo.current[shop_key]);
          });
        }
      };

      fetchShopList();
      setIsMapInitialized(true);
    }
  }, [
    isMapInitialized,
    initializeMap,
    mapInstanceRef,
    fetchCurrentLocation,
    setupMapEvents,
  ]);

  return (
    <Layout scrollable={false}>
      <SubHeader title="요청 위치 선택하기" />
      <div className="w-full flex-grow">
        <div id="map" ref={mapContainerRef} className="relative h-full w-full">
          {currentShop !== null && (
            <ShopInfo
              shopName={currentShop.shop_name}
              shopAdress={currentShop.address}
              img={currentShop.shop_url}
            />
          )}
          <MainPinIcon className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <MapFooter
        currentAddress={currentAddress}
        activeMarkerCount={activeMarkerCount}
      />
    </Layout>
  );
};

export default RequestMap;
