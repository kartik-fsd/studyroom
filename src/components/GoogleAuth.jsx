import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

function GoogleAuth({ setShowToast, navigate }) {
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const { sub, email, name } = data;
      const requestData = {
        googleId: sub,
        email: email,
        name: name,
      };
      const response = await fetch("http://localhost:3000/gauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., show error message)
        const errorData = await response.json();
        setShowToast(toast.error(errorData.message || "Registration failed"));
      } else {
        // Registration successful, you might want to redirect or perform other actions
        setShowToast(
          toast.success("Registration successful", { duration: 4000 })
        );
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShowToast(toast.error("Internal Server Error"));
    }
  };
  return (
    <div className="w-full flex items-center justify-center">
      <GoogleLogin
        text="signup_with"
        size="large"
        width={360}
        // height={150}
        auto_select={false}
        auto_prompt="false"
        theme="outline"
        shape="rectangular"
        logo_alignment="left"
        onSuccess={(credentialResponse) => {
          const decodedToken = jwtDecode(credentialResponse?.credential);
          console.log(decodedToken);
          onSubmit(decodedToken);
        }}
        onError={() => {
          console.log("Login Failed");
          setShowToast(toast.error("Login Failed"));
        }}
      />
    </div>
  );
}

GoogleAuth.propTypes = {
  setShowToast: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default GoogleAuth;
