import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-w-[20rem] max-w-[37.5rem] h-[100dvh] bg-grayscale-200 flex column overflow-x-hidden sc:border sc:border-opacity-50 sc:border-solid sc:border-grayscale-300 sc:fixed sc:left-1/2 sc:transform sc:-translate-x-1/2">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
