export const reverseGeocode = async (
  lat: number,
  lng: number,
): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lng),
        orders: [naver.maps.Service.OrderType.ADDR].join(","),
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          console.error("Reverse geocoding failed:", status);
          reject(null);
        } else {
          const address = response.v2.address.jibunAddress || null;
          resolve(address);
        }
      },
    );
  });
};
