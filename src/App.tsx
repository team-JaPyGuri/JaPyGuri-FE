import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import ToastContainer from "./components/Toast/ToastContainer";
import BottomUpSheetContainer from "./components/BottomUpSheet/BottomUpSheetContainer";

const App = () => {
  return (
    <RecoilRoot>
      <BottomUpSheetContainer />
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
