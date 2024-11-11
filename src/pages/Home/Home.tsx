import Layout from "../../components/Layout/Layout";
import Banner from "./components/Banner";
import HotNailList from "./components/HotNailList";
import SubTitle from "./components/SubTitle";
import HotNailMockData from "./hotNail.json";

const Home = () => {
  const HotNailData = HotNailMockData.data;

  return (
    <Layout>
      <Banner />
      <SubTitle title="HOT 인기 네일아트" className="mt-6" />
      <HotNailList data={HotNailData} />
    </Layout>
  );
};

export default Home;
