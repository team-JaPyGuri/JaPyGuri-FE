import "./global.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ToastContainer from "./components/Toast/ToastContainer";
import BottomUpSheetContainer from "./components/BottomUpSheet/BottomUpSheetContainer";

import Home from "./pages/Home/Home";
import Like from "./pages/Like/Like";
import RequestMap from "./pages/RequestMap/RequestMap";

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
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
