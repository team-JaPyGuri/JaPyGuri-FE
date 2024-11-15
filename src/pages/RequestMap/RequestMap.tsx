import { useRef, useEffect, useState } from "react";
import SubHeader from "../../components/Header/SubHeader";
import Layout from "../../components/Layout/Layout";

const RequestMap = () => {
  const mapElement = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (mapElement.current) {
      const mapOptions = {
        center: new naver.maps.LatLng(37.566535, 126.9779692), // Seoul default position
        zoom: 15,
      };
      const mapInstance = new naver.maps.Map(mapElement.current, mapOptions);
      setMap(mapInstance);
    }
  }, []);

  useEffect(() => {
    if (map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = new naver.maps.LatLng(latitude, longitude);
          map.setCenter(currentLocation);
        },
        (error) => {
          console.error("Error getting current location:", error);
        },
      );
    }
  }, [map]);

  return (
    <Layout scrollable={false}>
      <SubHeader title="요청 위치 선택하기" />
      <div className="w-full flex-grow">
        <div id="map" ref={mapElement} className="h-full w-full"></div>
      </div>
    </Layout>
  );
};

export default RequestMap;
