import "./global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Home from "./pages/Home";
import ToastContainer from "./components/Toast/ToastContainer";

const App = () => {
  return (
    <RecoilRoot>
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
