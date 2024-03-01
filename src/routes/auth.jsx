import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

function Auth() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default Auth;
