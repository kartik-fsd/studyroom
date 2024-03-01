import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
function Pages() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default Pages;
