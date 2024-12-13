import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTryOnHistory } from "../../hooks/api/getTryOnHistory";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import AiResultCard from "../../components/NailCard/AiResultCard";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

const AiResult = () => {
  const navigate = useNavigate();
  const [aiResultData, setAiResultData] = useState([]);

  useEffect(() => {
    const fetchTryOnHistory = async () => {
      try {
        const response = await getTryOnHistory();
        setAiResultData(response);
      } catch (error) {
        console.log("Error getting try-on-history request:", error);
      }
    };

    fetchTryOnHistory();
  }, []);

  return (
    <Layout>
      <Header subTitle="네일아트 AI 피팅" />
      <ListView
        title="AI 피팅 결과"
        noContent={{
          title: "아직 생성된 AI 피팅이 없어요.",
          subtitle: "하단 ‘시작하기’ 버튼을 눌러 체험해보세요.",
        }}
      >
        {aiResultData &&
          aiResultData.map(
            ({ created_at, design_key, original_image, predicted_image }) => (
              <AiResultCard
                key={created_at}
                designId={design_key}
                before={original_image}
                after={predicted_image}
              />
            ),
          )}
      </ListView>
      <Footer />
      <NavigationBar />
      <div className="fixed bottom-16 w-full min-w-[20rem] max-w-[37.5rem] px-4 py-3">
        <Button onClick={() => navigate("/select-nail")}>
          네일아트 AI 피팅 시작하기
        </Button>
      </div>
    </Layout>
  );
};

export default AiResult;
