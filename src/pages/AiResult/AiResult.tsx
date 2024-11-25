import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

const AiResult = () => {
  return (
    <Layout>
      <Header subTitle="네일아트 AI 피팅" />
      <ListView
        title="AI 피팅 결과"
        noContent={{
          title: "아직 생성된 AI 피팅이 없어요.",
          subtitle: "하단 ‘시작하기’ 버튼을 눌러 체험해보세요.",
        }}
        data={null}
      />
      <Footer />
      <NavigationBar />
      <div className="fixed bottom-14 w-full px-4 py-3">
        <Button>네일아트 AI 피팅 시작하기</Button>
      </div>
    </Layout>
  );
};

export default AiResult;
