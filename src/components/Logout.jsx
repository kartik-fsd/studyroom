import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "../components/Toast/Toast";
import toast from "react-hot-toast";

export default function Logout() {
  const [showToast, setShowToast] = useState();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setShowToast(toast.error(errorData.message || "Logout failed"));
      } else {
        setShowToast(
          toast.success("Logged out successfully", { duration: 1800 })
        );
        // Redirect to the login page or any other desired page
        navigate("/signIn");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setShowToast(toast.error("Internal Server Error"));
    }
  };

  return (
    <>
      {/* ... existing JSX ... */}
      <div className="mt-10 text-center">
        <button
          onClick={handleLogout}
          className="text-indigo-600 hover:text-indigo-500 font-semibold text-sm"
        >
          Logout
        </button>
      </div>
      <Toast showToast={showToast} />
    </>
  );
}
