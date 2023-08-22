"use client";

import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { loginUserUsingId, verifyToken } from "../../utils/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        loginUserUsingId(result.user.uid);
        router.push("/");
      })
      .catch(alert);
  };

  const handleLoginUsingEmail = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.getIdToken(true).then(async (idtoken) => {
          const data = await verifyToken(idtoken);
          if (data.passed) router.push("/");
          else {
            toast.error("Invalid Email or Password!!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
      })
      .catch((err) =>
        toast.error("Invalid Email or Password!!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  return (
    <div className="h-full w-full bg-white mx-auto relative">
      <ToastContainer />
      <div className="lg:w-1/3 mx-auto rounded-xl lg:shadow-xl p-10 bg-white lg:mt-12 flex flex-col ">
        <div className="mt-3 flex items-center gap-3">
          <img
            width={100}
            height={100}
            src="https://api.dicebear.com/6.x/big-smile/svg?seed=rainbow"
            alt="avt"
            loading="lazy"
          />
          <p className="text-5xl font-serif">Welcome to StockX</p>
        </div>

        <div className="flex gap-2 items-center mt-10">
          <LockClosedIcon className="w-6 h-6" />
          <p className="text-3xl font-serif">Sign In</p>
        </div>

        <p className="text-sm text-gray-400 mt-2">
          Please enter your login details.
        </p>
        <form
          onSubmit={handleLoginUsingEmail}
          className="flex flex-col gap-4 mt-6"
        >
          <div className="relative">
            <input
              name="email"
              type="text"
              value={email}
              id="floating_outlined"
              className="block border border-gray-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              name="password"
              type="text"
              value={password}
              id="floating_outlined2"
              className="block border border-gray-300 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <label
              htmlFor="floating_outlined2"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 peer-focus: rounded-xl"
            >
              Password
            </label>
          </div>

          <button
            className="p-3 px-6 bg-yellow-300 rounded-xl w-1/3 mx-auto mt-4 font-medium hover:bg-yellow-200"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="h-10 w-10 bg-gray-100 flex rounded-full justify-center mx-auto mt-5">
          <div
            className="h-8 w-8 relative mx-auto my-auto cursor-pointer"
            onClick={handleLogin}
          >
            <Image
              className="active:scale-90"
              objectFit="contain"
              layout="fill"
              src="https://cdn-icons-png.flaticon.com/512/2965/2965278.png"
              alt=""
            />
          </div>
        </div>

        <div className="inline-block text-center text-lg mt-5 font-mono">
          Don't have an account?
          <div className="inline-block px-2 text-lg transition">
            <Link href="/signup" className="text-blue-800 hover:text-xl">
              Create New One
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
