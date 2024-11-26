export const getAddressFromCoords = async (
  lat: number,
  lng: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lng),
        orders: [naver.maps.Service.OrderType.ADDR].join(","),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("Reverse geocoding failed:", status);
          reject("주소를 가져올 수 없습니다.");
        } else {
          const address =
            response.v2.address.jibunAddress || "주소를 가져올 수 없습니다.";
          resolve(address);
        }
      },
    );
  });
};
