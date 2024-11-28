import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import { useState, useEffect } from "react";
import ListView from "../../components/ListView/ListView";
import { getLikeList } from "../../hooks/api/getLikeList";

const Like = () => {
  const [nailData, setNailData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLikeList();
        setNailData(res);
      } catch (err) {
        console.error("Error fetching like list:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header subTitle="좋아요" />
      <ListView
        title="내가 좋아요한 네일아트"
        sort={true}
        noContent={{
          title: "아직 좋아요한 네일아트가 없어요.",
          subtitle: "'홈 화면'에서 좋아하는 네일아트를 찾아보세요.",
        }}
        data={nailData}
      />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Like;
