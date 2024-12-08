import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import RequestCard from "./components/RequestCard";
import { stateRequestResult } from "../../stores/stateRequestResult";

const RequestResult = () => {
  const requestResultData = useRecoilValue(stateRequestResult);
  const socket = useRecoilValue(stateSocket);

  useEffect(() => {
    if (socket) {
      const handleOpen = () => {
        const customerKey = localStorage.getItem("socketUserId");
        socket.send(
          JSON.stringify({
            action: "get_responses",
            data: {
              customer_key: customerKey,
            },
          }),
        );
      };

      if (socket.readyState === WebSocket.OPEN) {
        handleOpen();
      } else {
        socket.addEventListener("open", handleOpen);
      }

      return () => {
        socket.removeEventListener("open", handleOpen);
      };
    }
  }, [socket]);

  return (
    <Layout>
      <Header subTitle="네일아트 샵 요청" />
      <ListView
        title="네일아트 샵 요청 결과"
        noContent={{
          title: "아직 샵 요청 내역이 없어요.",
          subtitle: "'홈 화면'에서 네일아트를 찾아 요청해보세요.",
        }}
      >
        {requestResultData &&
          requestResultData.map(({ design_key, shop_requests }, index) => (
            <RequestCard
              key={index + design_key}
              designKey={design_key}
              responseData={shop_requests}
            />
          ))}
      </ListView>
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default RequestResult;
