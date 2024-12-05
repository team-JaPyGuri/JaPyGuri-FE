import { useToast } from "../../components/Toast/useToast";
import ShopHeader from "../../components/Header/ShopHeader";
import Footer from "../../components/Footer/Footer";
import ListView from "../../components/ListView/ListView";

const Dashboard = () => {
  const showToast = useToast();
  return (
    <main className="relative flex min-h-dvh w-full flex-col">
      <ShopHeader subTitle="유어썸뷰티" />
      <ListView
        title="고객 네일아트 요청"
        noContent={{
          title: "아직 도착한 요청이 없어요.",
          subtitle: "요청이 도착하면 여기서 확인하실 수 있어요.",
        }}
      ></ListView>
      <Footer />
    </main>
  );
};

export default Dashboard;
