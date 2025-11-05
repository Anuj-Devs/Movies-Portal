"use client"

import { useState } from "react";
import { register as registerApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [apiError, setApiError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function validate() {
    const newErrors = { email: "", password: "", confirmPassword: "" };
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please re-enter your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    return newErrors;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password || validationErrors.confirmPassword) return;

    setLoading(true);
    try {
      await registerApi({ email: formData.email, password: formData.password });
      router.push("/login");
    } catch (e) {
      setApiError(e?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-5">
      <h1 className="text-center pb-4">Register</h1>

      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Email"
          className="h-11 w-full font-semibold bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg pr-10"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            setErrors({ ...errors, email: "" });
            setApiError(null);
          }}
        />
        {errors.email && (
          <p className="text-sm font-semibold -mt-2 text-[var(--destructive)]">{errors.email}</p>
        )}

        <Input
          type="text"
          placeholder="Password"
          className="h-11 w-full font-semibold bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg pr-10"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            setErrors({ ...errors, password: "" });
            setApiError(null);
          }}
        />
        {errors.password && (
          <p className="text-sm font-semibold -mt-2 text-[var(--destructive)]">{errors.password}</p>
        )}

        <Input
          type="text"
          placeholder="Re-enter Password"
          className="h-11 w-full font-semibold bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg pr-10"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            setErrors({ ...errors, confirmPassword: "" });
            setApiError(null);
          }}
        />
        {errors.confirmPassword && (
          <p className="text-sm font-semibold -mt-2 text-[var(--destructive)]">{errors.confirmPassword}</p>
        )}
      </div>

      {apiError && <p className="text-sm font-semibold text-[var(--destructive)]">Error: {apiError}</p>}

      <Button
        type="submit"
        className="brand-btn cursor-pointer transition duration-500 h-12 w-full rounded-lg text-base font-semibold"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
}
