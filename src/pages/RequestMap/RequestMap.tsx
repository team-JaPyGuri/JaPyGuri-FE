import { useRef, useEffect, useState } from "react";
import SubHeader from "../../components/Header/SubHeader";
import Layout from "../../components/Layout/Layout";
import { useToast } from "../../components/Toast/useToast";
import { useMap } from "./useMap";
import MainPinIcon from "../../assets/svgs/mainPin.svg?react";
import MapFooter from "./components/MapFooter";

const RequestMap = () => {
  const isMapInitialized = useRef(false);
  const showToast = useToast();

  const [currentAddress, setCurrentAddress] = useState<string>("-");
  const [centerCoords, setCenterCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.5665,
    longitude: 126.978,
  });

  const {
    mapContainerRef,
    initializeMap,
    fetchCurrentLocation,
    setupMapEvents,
  } = useMap(centerCoords, setCenterCoords, showToast);

  useEffect(() => {
    if (!isMapInitialized.current) {
      initializeMap();
      fetchCurrentLocation();
      setupMapEvents();
      isMapInitialized.current = true;
    }
  }, [initializeMap, fetchCurrentLocation, setupMapEvents]);

  useEffect(() => {
    if (mapContainerRef.current) {
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

  return (
    <Layout scrollable={false}>
      <SubHeader title="요청 위치 선택하기" />
      <div className="w-full flex-grow">
        <div id="map" ref={mapContainerRef} className="relative h-full w-full">
          <MainPinIcon className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
      <MapFooter currentAddress={currentAddress} />
    </Layout>
  );
};

export default RequestMap;
