import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { TbCircleArrowRight } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function RegisterUser() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const MOB_REGEX = /^([+]\d{2})?\d{10}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const form = useRef();
  const errRef = useRef();

  const router = useRouter();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState("password");

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMobile(MOB_REGEX.test(mobile));
    setValidEmail(EMAIL_REGEX.test(email));
  }, [password, mobile, email]);

  useEffect(() => {
    setErrMsg("");
  }, [mobile, password, firstname, lastname, email]);

  const togglePwd = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:8080/api/auth/checkEmail/${email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const emailCheck = await res.json();
    if (emailCheck.length === 1) {
      setErrMsg("Registered User, Please Login!");
      return;
    }
    // if button enabled with JS hack
    const v1 = MOB_REGEX.test(mobile);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          mobile,
          email,
          password,
        }),
      };
      // API call
      await fetch("http://localhost:8080/api/register", requestOptions);
      // console.log(response.status);
      setSuccess(true);
      router.push("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="font-medium flex flex-col items-center justify-center text-xl sm:text-2xl uppercase text-gray-800">
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
        <span>Create your account</span>
        {!success ? (
          <p className="text-red-400 text-sm p-2" ref={errRef}>
            {errMsg}
          </p>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col bg-white border shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md mt-4">
        <form onSubmit={handleRegister} ref={form}>
          <div className="flex flex-row mb-5">
            <div className="flex flex-col mr-3">
              <label
                for="firstname"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                First Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <AiOutlineUser className="h-6 w-6" />
                </div>

                <input
                  id="Firstname"
                  type="text"
                  name="firstname"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="First Name"
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                  onFocus={() => setFirstnameFocus(true)}
                />
              </div>
              {firstnameFocus && !firstname ? (
                <p className="text-sm text-red-400">Please Enter Firstname</p>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col">
              <label
                for="lastname"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Last Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <AiOutlineUser className="h-6 w-6" />
                </div>

                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Last Name"
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                  onFocus={() => setLastnameFocus(true)}
                />
              </div>
              {lastnameFocus && !lastname ? (
                <p className="text-sm text-red-400">Please Enter Lastname</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label
              for="email"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Mobile No.:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <BsTelephone className="h-5 w-5" />
              </div>

              <input
                type="text"
                name="mobile"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Mobile No."
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
                onFocus={() => setMobileFocus(true)}
              />
            </div>
            {mobileFocus && !validMobile ? (
              <p className="text-sm text-red-400">Please Enter Valid Mobile</p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label
              for="email"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              E-Mail Address:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <MdAlternateEmail className="h-6 w-6" />
              </div>

              <input
                type="text"
                name="email"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="E-Mail Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                onFocus={() => setEmailFocus(true)}
              />
            </div>
            {emailFocus && !validEmail ? (
              <p className="text-sm text-red-400">Please Enter Valid Email</p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col mb-5">
            <label
              for="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Password:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <AiOutlineLock className="h-6 w-6" />
                </span>
              </div>

              <input
                id="password"
                type={type}
                name="password"
                className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                onFocus={() => setPwdFocus(true)}
              />
              <div className="inline-flex items-center justify-center absolute right-0 top-0 h-full w-10 text-gray-400">
                <div onClick={togglePwd}>
                  {type == "password" ? (
                    <AiOutlineEye className="h-6 w-6" />
                  ) : (
                    <AiOutlineEyeInvisible className="h-6 w-6" />
                  )}
                </div>
              </div>
            </div>
            {pwdFocus && !validPwd ? (
              <p className="text-sm text-red-400">
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters: <span>!</span> <span>@</span>{" "}
                <span>#</span> <span>$</span> <span>%</span>
              </p>
            ) : (
              <></>
            )}
          </div>

          <div className="flex w-full">
            <button
              type="submit"
              className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
              disabled={
                !validEmail ||
                !validMobile ||
                !firstname ||
                !lastname ||
                !validPwd
                  ? true
                  : false
              }
            >
              <span className="mr-2 uppercase">Register</span>
              <span>
                <TbCircleArrowRight className="h-6 w-6" />
              </span>
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center mt-6">
          <Link
            href={"/login"}
            target="_blank"
            className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
          >
            <span>
              <AiOutlineUserAdd className="h-6 w-6" />
            </span>
            <span className="ml-2">Already an User?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
