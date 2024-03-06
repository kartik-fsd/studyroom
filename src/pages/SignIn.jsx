import { Link } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import toast from "react-hot-toast";
import GoogleAuth from "../lib/google-oauth";
import { useAppContext } from "../components/context/context";

export default function SignIn() {
  const { navigate, showToast, setShowToast, setLoading, loading } =
    useAppContext();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const { sub } = data;
      const requestData = {
        googleId: sub,
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
        setShowToast(toast.error(errorData.message || "Login failed"));
      } else {
        // Registration successful, you might want to redirect or perform other actions
        setShowToast(toast.success("Login successful", { duration: 4000 }));
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setShowToast(toast.error("Internal Server Error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg sm:rounded-lg p-6 sm:p-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />

            <h1 className="mt-6 text-2xl font-bold leading-9 tracking-tight text-indigo-600 mb-4 text-center">
              Study Zone
            </h1>
            <h2 className="mt-6 text-center text-xl font-bold leading-9 tracking-tight text-chambray-900">
              Welcome back to Study Zone
            </h2>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <div className="w-full mt-4">
              <div className="flex flex-col items-center">
                {/* Google button */}
                <GoogleAuth
                  onSubmit={onSubmit}
                  text={"Continue with Google"}
                  disabled={loading}
                />
              </div>

              <div className="relative my-8 flex h-px place-items-center bg-gray-200">
                <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500 ">
                  or
                </div>
              </div>
              <div className="mx-auto">
                <p className="mt-6 text-xs text-gray-600 text-center leading-relaxed">
                  Ready to dive into the world of endless possibilities?
                  Let&apos;s rock the books together!
                  <Link
                    to="#"
                    className="border-b border-gray-500 border-dotted mx-1"
                  >
                    Terms of Service
                  </Link>
                  and
                  <Link
                    to="#"
                    className="border-b border-gray-500 border-dotted mx-1"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-chambray-600 hover:text-chambray-500"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Toast component for notifications */}
      <Toast showToast={showToast} />
    </>
  );
}
