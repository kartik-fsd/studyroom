import GoogleAuth from "../lib/google-oauth";
import { Link } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import toast from "react-hot-toast";
import { useAppContext } from "../components/context/context";

function SignUp() {
  const { navigate, showToast, setShowToast, setLoading, loading } =
    useAppContext();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-fit m-0 sm:m-10 bg-white shadow-lg sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
              Study Zone
            </h1>

            <div className="mt-10 flex flex-col items-center">
              <h2 className="text-2xl xl:text-2xl font-bold text-center mb-4 text-gray-700">
                Unlock your learning potential with StudyZone
              </h2>

              <div className="w-full mt-4">
                <div className="flex flex-col items-center">
                  {/* Google button */}
                  <GoogleAuth
                    onSubmit={onSubmit}
                    text={"Sign Up with Google"}
                    disabled={loading}
                  />
                </div>

                <div className="my-8 border-b w-1/2 mx-auto"></div>

                <div className="mx-auto max-w-md">
                  <p className="mt-6 text-xs text-gray-600 text-center">
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
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
                alt="Illustration"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <Toast showToast={showToast} />
    </>
  );
}

export default SignUp;
