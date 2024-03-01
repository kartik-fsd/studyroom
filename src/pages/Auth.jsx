import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast/Toast";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
  });
  const [showToast, setShowToast] = useState();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const { confirmPassword, ...requestData } = data;
      const response = await fetch("http://localhost:3000/register", {
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

  // Watch the 'password' and 'confirmPassword' fields for changes
  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center p-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-chambray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="text"
                  placeholder="Name"
                  {...register(
                    "name",
                    { required: true },
                    { pattern: /^[A-Za-z]+$/i }
                  )}
                  required
                  className="block w-full rounded-md border-0 px-3  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-chambray-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@example.com"
                  required
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={`block w-full rounded-md border-0 px-3  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-chambray-600 sm:text-sm sm:leading-6 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password (minimum 8 characters)"
                  autoComplete="current-password"
                  required
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                  className={`block w-full rounded-md border-0 px-3  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-chambray-600 sm:text-md sm:leading-6 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Re-enter the password"
                  required
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className={`block w-full rounded-md border-0 px-3  py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-chambray-600 sm:text-md sm:leading-6 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-chambray-600  px-3  py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-chambray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chambray-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="relative my-8 flex h-px place-items-center bg-gray-200">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500 ">
              or
            </div>
          </div>
          <button className="-2 w-full bg-slate-50 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-gray-100 ">
            <img
              className="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google"
            />{" "}
            Google
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have a account?{" "}
            <Link
              to="/signIn"
              className="font-semibold leading-6 text-chambray-600 hover:text-chambray-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Toast showToast={showToast} />
    </>
  );
}
