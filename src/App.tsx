import "./global.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import useUserTypeByRoute from "./hooks/socket/useUserTypeByRoute";
import ToastContainer from "./components/Toast/ToastContainer";
import BottomUpSheetContainer from "./components/BottomUpSheet/BottomUpSheetContainer";

import Home from "./pages/Home/Home";
import Like from "./pages/Like/Like";
import RequestMap from "./pages/RequestMap/RequestMap";
import AiResult from "./pages/AiResult/AiResult";
import RequestResult from "./pages/RequestResult/RequestResult";
import SelectNail from "./pages/SelectNail/SelectNail";
import SocketInitializer from "./components/SocketInitializer/SocketInitializer";
import Dashboard from "./pages/Dashboard/Dashboard";
import Camera from "./pages/Camera/Camera";

const AppRouter = () => {
  useUserTypeByRoute();
  return (
    <>
      <BottomUpSheetContainer />
      <ToastContainer />
      <SocketInitializer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
        <Route path="/request-map/:designId" element={<RequestMap />} />
        <Route path="/ai-result" element={<AiResult />} />
        <Route path="/request-result" element={<RequestResult />} />
        <Route path="/select-nail" element={<SelectNail />} />
        <Route path="/camera/:designId" element={<Camera />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
