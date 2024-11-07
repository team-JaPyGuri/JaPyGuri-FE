import { ReactNode } from "react";
import Header from "../Header";
import NavigationBar from "../NavigationBar/inex";
import Footer from "../../Footer";
import Button from "../Button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-w-[20rem] max-w-[37.5rem] min-h-[100dvh] bg-grayscale-200 flex-col sc:border-x sc:border-opacity-50 sc:border-solid sc:border-grayscale-300 sc:fixed sc:left-1/2 sc:transform sc:-translate-x-1/2">
      <Header />
      <NavigationBar />
      <main className="w-full">
        {children}
        <div className="w-full p-4">
          <Button>테스트</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
