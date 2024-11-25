import "./global.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastContainer from "./components/Toast/ToastContainer";
import BottomUpSheetContainer from "./components/BottomUpSheet/BottomUpSheetContainer";

import Home from "./pages/Home/Home";
import Like from "./pages/Like/Like";
import RequestMap from "./pages/RequestMap/RequestMap";
import AiResult from "./pages/AiResult/AiResult";
import RequestResult from "./pages/RequestResult/RequestResult";
import SelectNail from "./pages/SelectNail/SelectNail";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <BottomUpSheetContainer />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/like" element={<Like />} />
          <Route path="/request-map" element={<RequestMap />} />
          <Route path="/ai-result" element={<AiResult />} />
          <Route path="/request-result" element={<RequestResult />} />
          <Route path="/select-nail" element={<SelectNail />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
