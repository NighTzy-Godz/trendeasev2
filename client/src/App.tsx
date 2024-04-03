import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/static/HomeLayout";
import Home from "./pages/static/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";
function App() {
  const colorTheme = useSelector((state: RootState) => state.ui.colorTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, []);

  return (
    <BrowserRouter>
      {" "}
      <ToastContainer transition={Zoom} autoClose={2500} />
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
