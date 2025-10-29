import LoginForm from "@/components/auth/login-form"
import { WaveBg } from "@/components/wave-bg"
import Link from "next/link";

export default function Page() {
  return (
    <main className="app-shell">
      <section className="relative flex min-h-dvh items-center justify-center ">
        <div className="relative w-full max-w-md bg-gray-500/10 py-12 px-4 border border-border rounded-lg mx-4">
          <LoginForm />
          <div className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:text-blue-400/90 font-semibold cursor-pointer transition duration-150 delay-100 underline">
              Register here
            </Link>
          </div>
        </div>
        <WaveBg className="absolute bottom-0 inset-x-0" />
      </section>
    </main>
  )
}
