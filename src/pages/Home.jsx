import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const logout = () => {
    googleLogout();
    navigate("/signin");
  };
  return (
    <div>
      <button type="button" onClick={logout}>
        logout
      </button>
    </div>
  );
}

export default Home;
