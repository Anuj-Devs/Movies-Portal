import RegisterForm from "@/components/auth/register-form";
import Link from "next/link";
import { WaveBg } from "@/components/wave-bg"

export default function RegisterPage() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center">
      {/* <div className="w-full px-6 md:px-8 "> */}
      <div className="relative w-full max-w-md bg-gray-500/10 py-12 px-4 border border-border rounded-lg mx-4">
        <RegisterForm />
        <div className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-400/90 font-semibold cursor-pointer transition duration-150 delay-100 underline">
            Login here
          </Link>
        </div>
      </div>
       <WaveBg className="absolute bottom-0 inset-x-0" />
    </div>
  );
}
