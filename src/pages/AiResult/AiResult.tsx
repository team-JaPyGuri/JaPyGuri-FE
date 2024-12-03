import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import ListView from "../../components/ListView/ListView";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTryOnHistory } from "../../hooks/api/getTryOnHistory";
import { useToast } from "./../../components/Toast/useToast";
import AiResultCard from "../../components/NailCard/AiResultCard";

const AiResult = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [aiResultData, setAiResultData] = useState([]);

  useEffect(() => {
    const fetchTryOnHistory = async () => {
      try {
        const response = await getTryOnHistory();
        setAiResultData(response);
      } catch {
        showToast({ message: "서버와 통신할 수 없어요." });
      }
    };

    fetchTryOnHistory();
  }, [showToast]);

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
            ({ created_at, original_image, predicted_image }) => (
              <AiResultCard
                key={created_at}
                before={original_image}
                after={predicted_image}
              />
            ),
          )}
      </ListView>
      <Footer />
      <NavigationBar />
      <div className="fixed bottom-14 w-full min-w-[20rem] max-w-[37.5rem] px-4 py-3">
        <Button onClick={() => navigate("/select-nail")}>
          네일아트 AI 피팅 시작하기
        </Button>
      </div>
    </Layout>
  );
};

export default AiResult;
