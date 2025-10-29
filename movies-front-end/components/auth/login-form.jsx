"use client"

import { useState } from "react"
import { login } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { set } = useAuth()
  const [apiError, setApiError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  function validate() {
    const newErrors = { email: "", password: "" }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters"
    }

    return newErrors
  }

  async function onSubmit(e) {
    e.preventDefault()
    setApiError(null)

    const validationErrors = validate()
    setErrors(validationErrors)

    if (validationErrors.email || validationErrors.password) return

    setLoading(true)
    try {
      const res = await login({ email: formData.email, password: formData.password })
      set(res.token, formData.remember)
      router.push("/movies")
    } catch (e) {
      setApiError(e?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto space-y-5">
      <h1 className="text-center pb-4">Sign in</h1>

      <div className="space-y-3">
        <Input
          type="text"
          placeholder="Email"
          className="h-11 font-semibold bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            setErrors({ ...errors, email: "" })
            setApiError(null)
          }}
        />
        {errors.email && (
          <p className="text-sm font-semibold -mt-2 text-[var(--destructive)]">{errors.email}</p>
        )}

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="h-11 font-semibold w-full bg-input text-foreground/90 placeholder:text-foreground/50 border border-border rounded-lg pr-10"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
              setErrors({ ...errors, password: "" })
              setApiError(null)
            }}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-foreground/70"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </div>
        </div>
        {errors.password && (
          <p className="text-sm font-semibold -mt-2 text-[var(--destructive)]">{errors.password}</p>
        )}

        <label className="flex items-center justify-center pt-2 gap-2 text-foreground cursor-pointer">
          <Checkbox
            className="cursor-pointer"
            checked={formData.remember}
            onCheckedChange={(val) => setFormData({ ...formData, remember: val })}
          />
          <span>Remember me</span>
        </label>
      </div>

      {apiError && (
        <p className="text-sm font-semibold text-[var(--destructive)]">Error: {apiError}</p>
      )}

      <Button
        type="submit"
        className="brand-btn cursor-pointer transition duration-500 h-12 w-full rounded-lg text-base font-semibold"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg" />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  )
}
