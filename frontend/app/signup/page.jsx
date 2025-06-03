"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa6";
import { handleErrorToast, handleSuccessToast } from "@/lib/toast -message";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SignUp = () => {
  const router = useRouter();
  const [isLoding, setIsLoding] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const setInputes = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignupUser = async (e) => {
    e.preventDefault();
    try {
      setIsLoding(true);
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const { message, success, user } = await res.json();
      if (success) {
        handleSuccessToast(message);
        setIsLoding(false);
        router.push("/login");
      } else {
        handleErrorToast(message);
        setIsLoding(false);
      }
    } catch (err) {
      handleErrorToast(message);
      setIsLoding(false);
    }
  };

  return (
    <div className="flex items-center mt-14 justify-center min-h-[90vh]  px-4">
      <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-3xl shadow-xl border">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Please fill in the details to register
        </p>

        <form onSubmit={handleSignupUser} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <Input
              name="name"
              value={signupInfo.name}
              onChange={setInputes}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <Input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={setInputes}
              placeholder="Enter your email"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={signupInfo.password}
              onChange={setInputes}
              placeholder="Create a password"
              className="w-full"
            />
          </div>

          <Button className="w-full bg-black text-white hover:bg-gray-900 py-3 text-base transition">
            {isLoding ? <FaSpinner className=" animate-spin" /> : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
