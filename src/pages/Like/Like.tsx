import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import NailMockData from "../../mockData/nail.json";

const Like = () => {
  const NailData = NailMockData.data;

  return (
    <Layout>
      <Header subTitle="좋아요" />
      <ListView title="내가 좋아요한 네일아트" data={NailData} />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default Like;
