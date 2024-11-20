import { useRef, useEffect, useState } from "react";
import SubHeader from "../../components/Header/SubHeader";
import Layout from "../../components/Layout/Layout";
import { useToast } from "../../components/Toast/useToast";
import { useMap } from "./useMap";
import MainPinIcon from "../../assets/svgs/mainPin.svg?react";
import MapFooter from "./components/MapFooter";

import ShopMockData from "./shop_list.json";

const RequestMap = () => {
  const markersRef = useRef<naver.maps.Marker[]>([]);

  const isMapInitialized = useRef(false);
  const showToast = useToast();
  const ShopData = ShopMockData;

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
    if (mapInstanceRef.current) {
      const updateMarkers = (
        map: naver.maps.Map | undefined,
        markers: naver.maps.Marker[],
      ) => {
        if (!map) return;
        const mapBounds = map.getBounds();
        markers.forEach((marker) => {
          const position = marker.getPosition();
          if (mapBounds.hasPoint(position)) {
            showMarker(map, marker);
          } else {
            hideMarker(marker);
          }
        });
      };

      const showMarker = (map: naver.maps.Map, marker: naver.maps.Marker) => {
        if (!marker.getMap()) {
          marker.setMap(map);
        }
      };

      const hideMarker = (marker: naver.maps.Marker) => {
        if (marker.getMap()) {
          marker.setMap(null);
        }
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
    }
  }, [mapInstanceRef]);

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

  useEffect(() => {
    if (!isMapInitialized.current) {
      initializeMap();
      fetchCurrentLocation();
      setupMapEvents();

      ShopData.forEach((shop) => {
        const marker = new naver.maps.Marker({
          map: mapInstanceRef.current,
          position: new naver.maps.LatLng(+shop.lat, +shop.lng),
          title: shop.shop_key,
          zIndex: 10,
        });
        markersRef.current.push(marker);
      });

      isMapInitialized.current = true;
    }
  }, [
    initializeMap,
    mapInstanceRef,
    fetchCurrentLocation,
    setupMapEvents,
    ShopData,
  ]);

  return (
    <Layout scrollable={false}>
      <SubHeader title="요청 위치 선택하기" />
      <div className="w-full flex-grow">
        <div id="map" ref={mapContainerRef} className="relative h-full w-full">
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
