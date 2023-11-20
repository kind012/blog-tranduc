import { Header } from "./sections";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Home, Detail, NotFound, AddEditBlog } from "./pages/index";
import Preload from "./components/Preload";

import "./utils/fontawesome";

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
          <Toaster position="bottom-right" />
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
