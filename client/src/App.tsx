import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./pages/static/HomeLayout";
import Home from "./pages/static/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
function App() {
  const colorTheme = useSelector((state: RootState) => state.ui.colorTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", colorTheme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
