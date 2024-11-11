import { ReactNode } from "react";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import Button from "../Button/Button";
import { useToast } from "../Toast/useToast";
import { useBottomUpSheet } from "../BottomUpSheet/useBottomUpSheet";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const showToast = useToast();
  const showBottomUpSheet = useBottomUpSheet();

  return (
    <div className="min-h-[100dvh] w-full min-w-[20rem] max-w-[37.5rem] flex-col bg-grayscale-200 sc:fixed sc:left-1/2 sc:-translate-x-1/2 sc:transform sc:border-x sc:border-solid sc:border-grayscale-300 sc:border-opacity-50">
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
            Toast test button
          </Button>
          <Button
            className="mt-2"
            onClick={() =>
              showBottomUpSheet({
                title: "테스트",
                content: (
                  <div>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                    <p>테스트</p>
                  </div>
                ),
              })
            }
          >
            BottomUpSheet test button
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
