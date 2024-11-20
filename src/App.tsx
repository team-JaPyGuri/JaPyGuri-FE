import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home/Home";
import ToastContainer from "./components/Toast/ToastContainer";
import BottomUpSheetContainer from "./components/BottomUpSheet/BottomUpSheetContainer";
import RequestMap from "./pages/RequestMap/RequestMap";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <BottomUpSheetContainer />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/request-map" element={<RequestMap />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
