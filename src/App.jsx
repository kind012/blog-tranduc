import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./components/addBlog/AddBlog";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./layouts/Header";
import { useEffect, useState } from "react";
import "./utils/fontawesome";
import Preload from "./layouts/Preload";

function App() {
  const [active, setActive] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  });
  return (
    <div>
      {isLoading ? (
        <Preload />
      ) : (
        <div>
          <Header setActive={setActive} active={active} />
          <ToastContainer position="top-right" />
          <Routes>
            <Route path="/" element={<Home setActive={setActive} />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route
              path="/create"
              element={<AddEditBlog setActive={setActive} />}
            />
            <Route
              path="/update/:id"
              element={<AddEditBlog setActive={setActive} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
