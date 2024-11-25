import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import { useState, useEffect } from "react";
import axios from "axios";
import ListView from "../../components/ListView/ListView";

const Like = () => {
  const [nailData, setNailData] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/like-list.`).then((res) => {
      const resultData = res.data;
      if (typeof resultData !== "string") setNailData(resultData);
      else setNailData(null);
    });
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
