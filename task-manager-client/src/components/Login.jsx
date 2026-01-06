import { useState } from "react";
import axiosInstance from "../api/AxiosInstance.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [logInDetails, setLogInDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setLogInDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/task-manager/auth/login",
        logInDetails
      );

      const token = res.data.token;
      localStorage.setItem("token", token);

      navigate("/projects");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);

        setErrorMessage(error.response.data.message);
      }

      console.error(error);
    }
  }

  return (
    <section id="login" className="h-full">
      <div className="h-full bg-gray-900 flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            action=""
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-100"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  // required
                  onChange={handleChange}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  // required
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>
          <hr className="border-gray-700 mt-5" />
          <a
            href="/register"
            className="flex justify-center font-semibold mt-5 text-sm  bg-gray-800 text-white hover:bg-gray-700 rounded-md px-3 py-1.5 "
          >
            Create New Account
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
