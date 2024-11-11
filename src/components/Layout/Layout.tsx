import { ReactNode } from "react";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full min-w-[20rem] max-w-[37.5rem] flex-col bg-grayscale-200 sc:fixed sc:left-1/2 sc:-translate-x-1/2 sc:transform sc:border-x sc:border-solid sc:border-grayscale-300 sc:border-opacity-50">
      <Header />
      <NavigationBar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
