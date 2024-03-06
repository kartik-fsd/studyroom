import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

function Auth() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default Auth;
