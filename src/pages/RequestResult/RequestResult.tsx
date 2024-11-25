import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";

const RequestResult = () => {
  return (
    <Layout>
      <Header subTitle="네일아트 샵 요청" />
      <ListView
        title="네일아트 샵 요청 결과"
        noContent={{
          title: "아직 샵 요청 내역이 없어요.",
          subtitle: "'홈 화면'에서 네일아트를 찾아 요청해보세요.",
        }}
        data={null}
      />
      <Footer />
      <NavigationBar />
    </Layout>
  );
};

export default RequestResult;
