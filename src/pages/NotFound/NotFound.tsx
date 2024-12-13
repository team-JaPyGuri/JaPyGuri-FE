import { useEffect } from "react";

import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useToast } from "../../components/Toast/useToast";
import { useNavigate } from "react-router-dom";

const WORD_ART = `
      o88     ooooooo         o88   
    o8888   o888  o888o     o8888   
  o88 888   888  8  888   o88 888   
o888oo888oo 888o8  o888 o888oo888oo 
     o888o    88ooo88        o888o  
`;

const NotFound = () => {
  const showToast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    showToast({ message: "요청하신 페이지를 찾을 수 없어요." });
  });

  return (
    <Layout>
      <Header subTitle="404 Not Found" />
      <div className="flex flex-col justify-center text-center">
        <pre className="text-text-week mb-6 mt-12 w-full text-center font-mono text-xs text-grayscale-500">
          {WORD_ART}
        </pre>
        <span className="semibold-13 text-grayscale-600">
          이런! 잘못된 접근이에요.
        </span>
        <span className="regular-13 text-grayscale-600">
          요청하신 페이지를 찾을 수 없어요. 다시 시도해주세요.
        </span>
      </div>
      <Footer />
      <NavigationBar />
      <div className="fixed bottom-14 w-full min-w-[20rem] max-w-[37.5rem] px-4 py-3">
        <Button onClick={() => navigate("/")}>홈 화면으로 돌아가기</Button>
      </div>
    </Layout>
  );
};

export default NotFound;
