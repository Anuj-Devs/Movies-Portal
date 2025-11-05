"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import { WaveBg } from "@/components/wave-bg";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-background">
      <WaveBg
        className={`absolute bottom-0 inset-x-0 transition-all duration-700 ease-in-out
          ${isLogin ? "translate-x-0 scale-x-100" : "-translate-x-10 scale-x-110"}
        `}
      />

      <div className="relative w-full max-w-md px-6 z-10">
        <div
          className={`transition-all duration-700 ease-in-out transform ${
            isLogin ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0 pointer-events-none"
          } absolute top-0 left-0 w-full`}
        >
          <LoginForm />
          <p className="mt-4 text-sm text-foreground/70 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-blue-500 hover:text-blue-400/90 font-semibold underline"
            >
              Register here
            </button>
          </p>
        </div>

        <div
          className={`transition-all duration-700 ease-in-out transform ${
            isLogin ? "translate-x-10 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"
          } absolute top-0 left-0 w-full`}
        >
          <RegisterForm />
          <p className="mt-4 text-sm text-foreground/70 text-center">
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-500 hover:text-blue-400/90 font-semibold underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
