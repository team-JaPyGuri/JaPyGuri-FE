import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  scrollable?: boolean;
}

const Layout = ({ children, scrollable = true }: LayoutProps) => {
  return (
    <>
      <main
        className={`${scrollable ? "min-h-dvh" : "h-dvh overflow-hidden"} mx-auto flex w-full min-w-[20rem] max-w-[37.5rem] flex-col bg-grayscale-200 sc:border-x sc:border-solid sc:border-grayscale-300 sc:border-opacity-50`}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
