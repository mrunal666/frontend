import Image from "next/image";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { TbCircleArrowRight } from "react-icons/tb";

export default function LoginUser() {
  const router = useRouter();
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState("password");

  const togglePwd = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    var v1 = PWD_REGEX.test(password);
    var v2 = EMAIL_REGEX.test(email);
    if (!v1 || !v2) {
      setErrMsg("Invalid Email or Password");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      };
      const res = await fetch(
        "http://localhost:8080/api/auth/login",
        requestOptions
      );
      const user = await res.json();

      if (res.status == 401) {
        setErrMsg(user.message);
        return;
      }
      setSuccess(true);
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user.user));
      router.push("/");
    } catch (err) {
      throw err;
    }
  };
  return (
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="font-medium flex flex-col items-center justify-center text-xl sm:text-2xl uppercase text-gray-800">
        <Link href={"/"}>
          <Image
            priority
            width={100}
            height={100}
            src={
              "https://ik.imagekit.io/h5gbgovde/images/logo.png?updatedAt=1681079007705"
            }
            alt="logo"
          />
        </Link>
        <span>Login To Your Account</span>
        {!success ? (
          <p className="text-red-400 text-sm p-2" ref={errRef}>
            {errMsg}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div class="flex flex-col bg-white border shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md mt-4">
        <form onSubmit={SubmitHandler}>
          <div class="flex flex-col mb-6">
            <label
              for="email"
              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              E-Mail Address:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <MdAlternateEmail className="h-6 w-6" />
              </div>

              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="E-Mail Address"
              />
            </div>
          </div>
          <div class="flex flex-col mb-6">
            <label
              for="password"
              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Password:
            </label>
            <div class="relative">
              <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <AiOutlineLock className="h-6 w-6" />
              </div>
              <input
                id="password"
                type={type}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Password"
              />
              <div class="inline-flex items-center justify-center absolute right-0 top-0 h-full w-10 text-gray-400">
                <div onClick={togglePwd}>
                  {type == "password" ? (
                    <AiOutlineEye className="h-6 w-6" />
                  ) : (
                    <AiOutlineEyeInvisible className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-full">
            <button
              type="submit"
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              // disabled={!validEmail || !validPwd ? true : false}
            >
              <span class="mr-2 uppercase">Login</span>
              <span>
                <TbCircleArrowRight className="h-6 w-6" />
              </span>
            </button>
          </div>
        </form>
        <div class="flex justify-center items-center mt-6">
          <Link
            href={"/register"}
            target="_blank"
            class="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
          >
            <span>
              <AiOutlineUserAdd className="h-6 w-6" />
            </span>
            <span class="ml-2">You don't have an account?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
