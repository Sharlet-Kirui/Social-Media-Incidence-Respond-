import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm text-center space-y-6">
        
        <div className="flex justify-center">
          <div className="p-3 rounded-full border">
            <Lock />
          </div>
        </div>

        <h2 className="text-xl font-semibold">Sign in to Your Account</h2>

        <div className="text-left space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded bg-blue-50 outline-none"
            />
          </div>

          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className="w-full mt-1 px-3 py-2 border rounded bg-blue-50 outline-none pr-10"
              />
              <button
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex gap-2">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="underline">Forgot your password?</a>
          </div>

          <button className="w-full bg-black text-white py-2 rounded font-semibold">
            SIGN IN
          </button>
        </div>

        <p className="text-sm">
          Don’t have an account?{" "}
          <a href="/SignUp" className="font-semibold underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}
