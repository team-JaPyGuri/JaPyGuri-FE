import { ReactNode } from "react";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import { useToast } from "../Toast/useToast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const showToast = useToast();

  return (
    <div className="w-full min-w-[20rem] max-w-[37.5rem] min-h-[100dvh] bg-grayscale-200 flex-col sc:border-x sc:border-opacity-50 sc:border-solid sc:border-grayscale-300 sc:fixed sc:left-1/2 sc:transform sc:-translate-x-1/2">
      <Header />
      <NavigationBar />
      <main className="w-full">
        {children}
        <div className="w-full p-4">
          <Button
            onClick={() =>
              showToast({
                message: "AI 피팅이 완료되었어요.",
                link: "https://www.naver.com",
              })
            }
          >
            테스트
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
