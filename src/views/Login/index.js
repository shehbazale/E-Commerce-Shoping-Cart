import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, passwordReset, signInWithGoogle } from "../../config/firebase";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailerror] = useState("");
  const [passwordError, setPassworderror] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailerror("Email is  required");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setEmailerror("Invalid email format");
      valid = false;
    } else {
      setEmailerror("");
    }
    if (password.trim() === "") {
      setPassworderror("password is required");
      valid = false;
    } else if (password.length < 6) {
      setPassworderror("Password length should be 6 ");
      valid = false;
    } else {
      setPassworderror("");
    }
    return valid;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await login(email, password);
      toast.success("Successfully logged in");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithGoogle();
      if (result) {
        toast.success("successfully login");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (e) {
      toast.error(e.message);
    }

    // console.logo('click')
  };

  const resetPassword = async () => {
    try {
      await passwordReset(email);
      toast.success("Password reset link send");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <Toaster position="top-right" reverseOrder={false} />
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex justify-center">
              <img src="/log.png" className="w-16" alt="logo" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <>
                  <div className="flex flex-col items-center">
                    <h2 className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center mb-8">
                      <span>Sign In</span>
                    </h2>
                  </div>
                  <form onSubmit={loginUser}>
                    <div className="mx-auto max-w-xs">
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <p className="text-red-500 text-sm mt-2">
                          {emailError}
                        </p>
                      )}
                      <input
                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <p className="text-red-500 text-sm mt-2">
                          {passwordError}
                        </p>
                      )}
                      <div className="flex justify-end mt-4">
                        <span
                          className="text-sm text-right font-medium text-blue-800 hover:underline dark:text-primary-500 hover:cursor-pointer"
                          onClick={resetPassword}
                        >
                          Forgot password?
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-4">Login</span>
                      </button>
                      <p className="text-center mt-2">or</p>
                      <button
                        onClick={googleLogin}
                        className="mt-2 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      >
                        <svg
                          class="h-6 w-6 mr-2"
                          width="800px"
                          height="800px"
                          viewBox="-0.5 0 48 48"
                          version="1.1"
                        >
                          {" "}
                          <title>Google-color</title>{" "}
                          <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                          <g
                            id="Icons"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            {" "}
                            <g
                              id="Color-"
                              transform="translate(-401.000000, -860.000000)"
                            >
                              {" "}
                              <g
                                id="Google"
                                transform="translate(401.000000, 860.000000)"
                              >
                                {" "}
                                <path
                                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                  id="Fill-1"
                                  fill="#FBBC05"
                                >
                                  {" "}
                                </path>{" "}
                                <path
                                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                  id="Fill-2"
                                  fill="#EB4335"
                                >
                                  {" "}
                                </path>{" "}
                                <path
                                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                  id="Fill-3"
                                  fill="#34A853"
                                >
                                  {" "}
                                </path>{" "}
                                <path
                                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                  id="Fill-4"
                                  fill="#4285F4"
                                >
                                  {" "}
                                </path>{" "}
                              </g>{" "}
                            </g>{" "}
                          </g>{" "}
                        </svg>
                        <span className="ml-4">Signin with Google</span>
                      </button>

                      <p className="mt-6 text-lg font-bold text-gray-600 text-center">
                        <button
                          onClick={() => {
                            navigate("/register");
                            console.log("sign up click");
                          }}
                          className="border-b border-gray-500 border-dotted"
                        >
                          Register
                        </button>
                      </p>
                    </div>
                  </form>
                </>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex justify-center">
            <div
              className="m-6 xl:m-8 w-72 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/log.png')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
