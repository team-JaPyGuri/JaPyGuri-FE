import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import { useState, useEffect } from "react";
import ListView from "../../components/ListView/ListView";
import { getLikeList } from "../../api/getLikeList";

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
      <ListView title="내가 좋아요한 네일아트" data={nailData} />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Like;
