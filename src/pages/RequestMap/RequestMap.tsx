import SubHeader from "../../components/Header/SubHeader";
import Layout from "../../components/Layout/Layout";
import MainPinIcon from "../../assets/svgs/mainPin.svg?react";
import MapFooter from "./components/MapFooter";
import ShopInfo from "./components/ShopInfo";

import Coordinates from "../../types/Coordinates";
import MarkerInfo from "../../types/MarkerInfo";

import { useRef, useEffect, useState } from "react";
import { useToast } from "../../components/Toast/useToast";
import { useInitializeMap } from "../../hooks/map/useInitializeMap";
import { useFetchCurrentLocation } from "../../hooks/map/useFetchCurrentLocation";
import { useSetupMapEvents } from "../../hooks/map/useSetupMapEvents";
import { useShopMarkers } from "../../hooks/map/useShopMarkers";

const INITIAL_COORDINATES: Coordinates = {
  latitude: 37.5665,
  longitude: 126.978,
};

const RequestMap = () => {
  const showToast = useToast();

  const markersRef = useRef<naver.maps.Marker[]>([]);
  const markersInfo = useRef<Record<string, MarkerInfo>>({});
  const { mapContainerRef, mapInstanceRef, initializeMap } =
    useInitializeMap(INITIAL_COORDINATES);

  const [centerCoords, setCenterCoords] = useState(INITIAL_COORDINATES);
  const [currentAddress, setCurrentAddress] = useState("-");
  const [currentShop, setCurrentShop] = useState<MarkerInfo | null>(null);
  const [activeMarkerCount, setActiveMarkerCount] = useState(0);

  const { fetchCurrentLocation } = useFetchCurrentLocation(
    setCenterCoords,
    showToast,
    mapInstanceRef,
  );
  const { setupMapEvents } = useSetupMapEvents(
    mapInstanceRef,
    setCenterCoords,
    setCurrentAddress,
    markersRef,
    setActiveMarkerCount,
  );
  const { shopMarkers } = useShopMarkers({
    mapInstanceRef,
    markersRef,
    markersInfo,
    setCurrentShop,
  });

  useEffect(() => {
    initializeMap();
    fetchCurrentLocation();
    shopMarkers();
    setupMapEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout scrollable={false}>
      <SubHeader title="요청 위치 선택하기" />
      <div className="w-full flex-grow">
        <div id="map" ref={mapContainerRef} className="relative h-full w-full">
          {currentShop && (
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
