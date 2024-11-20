import axios from "axios";
import { useEffect } from "react";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import Banner from "./components/Banner";
import HotNailList from "./components/HotNailList";
import NailSnap from "./components/NailSnap";
import SubTitle from "./components/SubTitle";

import HotNailMockData from "./hotNail.json";

const Home = () => {
  const HotNailData = HotNailMockData.data;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NAILO_API_URL}/api/home`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <Header />
      <Banner />
      <SubTitle title="HOT 인기 네일아트" className="mt-6" />
      <HotNailList data={HotNailData} />
      <SubTitle title="네일아트 스냅 " className="mt-6" />
      <NailSnap />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Home;
