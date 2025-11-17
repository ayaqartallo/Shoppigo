"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      setSuccess(res.ok);
      if (res.ok) {
        login(data.token, localStorage.getItem("redirectAfterLogin") || "/");
        localStorage.removeItem("redirectAfterLogin");
        setTimeout(() => router.push(data.redirectAfterLogin || "/"), 500);
      }
    } catch {
      setMessage("Something went wrong");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative space-y-6 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center text-white">Welcome Back</h1>
      <p className="text-center text-gray-300">Please login to your account</p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {message && (
        <p className={`text-center ${success ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <p className="text-center text-gray-400">
        Don’t have an account?{" "}
        <a href="/auth/signup" className="text-blue-500 hover:underline">
          Sign up
        </a>
      </p>
      <p className="text-center text-gray-400">
        <a href="/auth/forgot-password" className="text-blue-500 hover:underline">
          Forgot your Password?
        </a>
      </p>
    </div>
  );
}
