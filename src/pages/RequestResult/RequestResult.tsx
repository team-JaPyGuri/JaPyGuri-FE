import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { stateSocket } from "../../stores/stateSocket";
import RequestCard from "./components/RequestCard";

const RequestResult = () => {
  const [requestResultData, setRequestResultData] = useState(null);
  const socket = useRecoilValue(stateSocket);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "response_list") setRequestResultData(data.design);
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.addEventListener("message", handleMessage);
      const customerKey = localStorage.getItem("socketUserId");
      socket.send(
        JSON.stringify({
          action: "get_responses",
          data: {
            customer_key: customerKey,
          },
        }),
      );
    }

    return () => {
      if (socket) {
        socket.removeEventListener("message", handleMessage);
      }
    };
  }, [socket]);

  useEffect(() => {
    console.log(1, requestResultData);
  }, [requestResultData]);

  return (
    <Layout>
      <Header subTitle="네일아트 샵 요청" />
      <RequestCard />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default RequestResult;

/*
<ListView
        title="네일아트 샵 요청 결과"
        noContent={{
          title: "아직 샵 요청 내역이 없어요.",
          subtitle: "'홈 화면'에서 네일아트를 찾아 요청해보세요.",
        }}
      >
        {requestResultData && requestResultData.map((data) => <RequestCard />)}
      </ListView>
      */
